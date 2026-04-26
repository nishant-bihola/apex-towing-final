import express from 'express';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Supabase Configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Nodemailer Configuration
const EMAIL_USER = process.env.EMAIL_USER || "nishant15bihola@gmail.com";
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;
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
    const results = { supabase: false, ownerEmail: false, clientEmail: false };

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

    // 2. Notification to Owner
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

const PORT = 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
  });
}

export default app;
