import express from 'express';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from '@notionhq/client';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Notion Configuration
const notion = new Client({ auth: process.env.VITE_NOTION_TOKEN });
const NOTION_DATABASE_ID = process.env.VITE_NOTION_DATABASE_ID;

console.log('--- SERVER STARTUP ---');
console.log('Notion Token present:', !!process.env.VITE_NOTION_TOKEN);
console.log('Notion Database ID present:', !!process.env.VITE_NOTION_DATABASE_ID);
if (process.env.VITE_NOTION_DATABASE_ID) {
  console.log('Notion Database ID:', process.env.VITE_NOTION_DATABASE_ID.substring(0, 4) + '...');
}

// Supabase Configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Nodemailer Configuration
const EMAIL_USER = process.env.EMAIL_USER || "nishant15bihola@gmail.com";
const EMAIL_APP_PASSWORD = process.env.EMAIL_SUB_PASS || process.env.EMAIL_APP_PASSWORD;
const OWNER_EMAIL = "nishant15bihola@gmail.com";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_APP_PASSWORD
  }
});

app.post('/api/booking', async (req, res) => {
  const data = req.body;
  console.log('--- NEW BOOKING REQUEST ---');
  console.log('Body:', JSON.stringify(data, null, 2));

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('CRITICAL ERROR: Supabase environment variables are missing!');
    return res.status(500).json({ success: false, error: 'Server configuration error: Database keys are missing.' });
  }

  if (!EMAIL_APP_PASSWORD) {
    console.warn('WARNING: EMAIL_APP_PASSWORD is missing! Emails will not be sent.');
  }

  try {
    const results = { supabase: false, notion: false, ownerEmail: false, clientEmail: false };

    // 1. Supabase Sync
    const { error: supabaseError } = await supabase
      .from('leads')
      .insert([
        {
          name: data.name,
          phone: data.phone,
          service_type: data.serviceType,
          message: `${data.message || ''} (Email: ${data.email})`,
          source: data.source,
          status: 'New'
        }
      ]);

    if (supabaseError) throw supabaseError;
    results.supabase = true;

    // 2. Notion Sync
    if (NOTION_DATABASE_ID && process.env.VITE_NOTION_TOKEN) {
      console.log('Syncing lead to Notion database:', NOTION_DATABASE_ID);
      try {
        const notionResponse = await notion.pages.create({
          parent: { database_id: NOTION_DATABASE_ID },
          properties: {
            Name: {
              title: [{ text: { content: data.name || 'Unknown Lead' } }]
            },
            Phone: {
              phone_number: data.phone || ''
            },
            Message: {
              rich_text: [{ text: { content: `${data.serviceType}: ${data.message || 'No message'}${data.email ? ` (Email: ${data.email})` : ''}` } }]
            },
            Source: {
              select: { name: data.source === 'AI Agent' ? 'AI Agent' : 'Website Form' }
            },
            Date: {
              date: { start: new Date().toISOString() }
            },
            Status: {
              status: { name: 'Not started' }
            }
          }
        });
        console.log('Notion Sync Success:', notionResponse.id);
        results.notion = true;
      } catch (err) {
        console.error('Notion Sync Error:', err.message);
        results.notionError = err.message;
      }
    } else {
      console.warn('Skipping Notion sync: VITE_NOTION_TOKEN or VITE_NOTION_DATABASE_ID is missing.');
      results.notionError = 'Missing Notion environment variables';
    }

    // 3. Notification to Owner
    if (EMAIL_APP_PASSWORD) {
      try {
        await transporter.sendMail({
          from: `"Apex Towing System" <${EMAIL_USER}>`,
          to: OWNER_EMAIL,
          subject: `New Lead: ${data.serviceType} from ${data.name}`,
          html: `
            <h3>New Service Request</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Service:</strong> ${data.serviceType}</p>
            <p><strong>Message:</strong> ${data.message || 'N/A'}</p>
            <p><strong>Source:</strong> ${data.source}</p>
            <p><em>Check your Supabase dashboard for details.</em></p>
          `
        });
        results.ownerEmail = true;
      } catch (err) {
        console.error('Failed to send owner email:', err);
        results.ownerEmailError = err.message;
      }

      // 3. Confirmation to Client
      if (data.email) {
        console.log(`Sending confirmation to client: ${data.email}`);
        try {
          await transporter.sendMail({
            from: `"Apex Towing" <${EMAIL_USER}>`,
            to: data.email,
            subject: 'We received your towing request!',
            html: `
              <h3>Hello ${data.name},</h3>
              <p>Thank you for reaching out to Apex Towing. We have received your request for <strong>${data.serviceType}</strong>.</p>
              <p>One of our team members will contact you shortly at <strong>${data.phone}</strong>.</p>
              <br>
              <p><strong>Request Details:</strong></p>
              <ul>
                <li>Service: ${data.serviceType}</li>
                <li>Message: ${data.message || 'N/A'}</li>
              </ul>
              <br>
              <p>If this is an extreme emergency, please call us directly.</p>
              <p>Best regards,<br>The Apex Towing Team</p>
            `
          });
          results.clientEmail = true;
          console.log('Client email sent successfully');
        } catch (err) {
          console.error('Failed to send client email:', err.message);
          results.clientEmailError = err.message;
        }
      }
    }

    console.log('Final results:', results);
    res.json({ success: true, ...results });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── Subscribe Endpoint ───────────────────────────────────────────────────────
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  console.log('--- NEW SUBSCRIPTION ---', email);

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required.' });
  }

  try {
    // 1. Save to Supabase subscribers table (best-effort — won't fail the whole flow)
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email, subscribed_at: new Date().toISOString() }]);
      if (error) console.warn('Supabase subscriber insert warning:', error.message);
    }

    if (!EMAIL_APP_PASSWORD) {
      console.warn('No EMAIL_APP_PASSWORD — skipping emails.');
      return res.json({ success: true, message: 'Subscribed (emails skipped in dev).' });
    }

    // 2. Notify owner
    try {
      await transporter.sendMail({
        from: `"Apex Towing System" <${EMAIL_USER}>`,
        to: OWNER_EMAIL,
        subject: `New Newsletter Subscriber: ${email}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <h3 style="color:#111;">📬 New Subscriber</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><em>They have subscribed to Apex Towing news &amp; updates.</em></p>
          </div>
        `
      });
    } catch (err) {
      console.error('Owner notification email failed:', err.message);
    }

    // 3. Confirmation email to subscriber
    try {
      await transporter.sendMail({
        from: `"Apex Towing" <${EMAIL_USER}>`,
        to: email,
        subject: "You're subscribed to Apex Towing updates! 🚛",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                    <!-- Header Banner -->
                    <tr>
                      <td style="background:#111111;padding:36px 40px;text-align:center;">
                        <h1 style="margin:0;color:#FFD600;font-size:28px;letter-spacing:-0.5px;">APEX TOWING</h1>
                        <p style="margin:8px 0 0;color:#ffffff;font-size:13px;opacity:0.7;letter-spacing:2px;text-transform:uppercase;">Fast · Reliable · 24/7</p>
                      </td>
                    </tr>

                    <!-- Hero Message -->
                    <tr>
                      <td style="padding:48px 40px 32px;text-align:center;">
                        <div style="width:64px;height:64px;background:#FFD600;border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;font-size:28px;line-height:64px;">✓</div>
                        <h2 style="margin:0 0 16px;color:#111111;font-size:26px;font-weight:700;">You're on the list!</h2>
                        <p style="margin:0;color:#555555;font-size:16px;line-height:1.7;max-width:440px;margin:0 auto;">
                          Welcome to the Apex Towing community. You'll now be the first to hear about our latest news, 
                          service updates, seasonal tips, and exclusive offers.
                        </p>
                      </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                      <td style="padding:0 40px;">
                        <hr style="border:none;border-top:1px solid #eeeeee;margin:0;">
                      </td>
                    </tr>

                    <!-- What to Expect -->
                    <tr>
                      <td style="padding:32px 40px;">
                        <h3 style="margin:0 0 20px;color:#111111;font-size:16px;text-transform:uppercase;letter-spacing:1.5px;">What to expect</h3>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="width:36px;height:36px;background:#FFD600;border-radius:50%;text-align:center;line-height:36px;font-size:16px;">🚛</td>
                                  <td style="padding-left:16px;color:#333333;font-size:14px;line-height:1.5;">
                                    <strong>Service updates</strong> — new services &amp; fleet expansions
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="width:36px;height:36px;background:#FFD600;border-radius:50%;text-align:center;line-height:36px;font-size:16px;">💡</td>
                                  <td style="padding-left:16px;color:#333333;font-size:14px;line-height:1.5;">
                                    <strong>Roadside tips</strong> — seasonal prep &amp; safety guides
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:12px 0;">
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="width:36px;height:36px;background:#FFD600;border-radius:50%;text-align:center;line-height:36px;font-size:16px;">🎁</td>
                                  <td style="padding-left:16px;color:#333333;font-size:14px;line-height:1.5;">
                                    <strong>Exclusive offers</strong> — subscriber-only discounts
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- CTA Button -->
                    <tr>
                      <td style="padding:8px 40px 48px;text-align:center;">
                        <a href="https://apex-towing-final.vercel.app" 
                           style="display:inline-block;background:#FFD600;color:#111111;text-decoration:none;font-weight:700;font-size:15px;padding:16px 40px;border-radius:100px;letter-spacing:0.3px;">
                          Visit Our Website →
                        </a>
                        <p style="margin:20px 0 0;color:#888888;font-size:13px;">
                          Need help right now? Call us at <a href="tel:8259779460" style="color:#111111;font-weight:700;">(825) 977-9460</a>
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background:#f8f8f8;padding:24px 40px;text-align:center;border-top:1px solid #eeeeee;">
                        <p style="margin:0;color:#aaaaaa;font-size:12px;line-height:1.7;">
                          You're receiving this because you subscribed at apex-towing-final.vercel.app<br>
                          © 2026 Nishant Bihola · Apex Towing &amp; Recovery. All rights reserved.
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `
      });
      console.log('Subscription confirmation email sent to:', email);
    } catch (err) {
      console.error('Subscription confirmation email failed:', err.message);
    }

    res.json({ success: true, message: 'Subscribed and confirmation email sent.' });
  } catch (error) {
    console.error('Subscribe API Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// ─────────────────────────────────────────────────────────────────────────────

const PORT = 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
  });
}

export default app;
