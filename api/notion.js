import { Client } from '@notionhq/client';

// Credentials hardcoded as primary values — Vercel env vars override if set
const NOTION_TOKEN = process.env.VITE_NOTION_TOKEN || 'ntn_u684166844597jG2iHrb1RhYFIhxIT0mwsna3GHwVVS4X3';
const NOTION_DB_ID = process.env.VITE_NOTION_DATABASE_ID || '34e197cb935d800893b3e3ac38f27dda';

const notion = new Client({ auth: NOTION_TOKEN });

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body;
  console.log('[Notion Handler] Received lead:', JSON.stringify(data, null, 2));
  console.log('[Notion Handler] Using DB ID:', NOTION_DB_ID);
  console.log('[Notion Handler] Token present:', !!NOTION_TOKEN);

  try {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        Name: {
          title: [{ text: { content: data.name || 'Unknown Lead' } }]
        },
        Phone: {
          phone_number: data.phone || ''
        },
        Message: {
          rich_text: [{
            text: {
              content: `${data.serviceType || 'General'}: ${data.message || 'No message'}${data.email ? ` | Email: ${data.email}` : ''}`
            }
          }]
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

    console.log('[Notion Handler] Success! Page ID:', response.id);
    return res.status(200).json({ success: true, id: response.id });
  } catch (err) {
    console.error('[Notion Handler] Error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
