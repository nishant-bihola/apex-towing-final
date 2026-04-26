import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.VITE_NOTION_TOKEN || 'ntn_u684166844597jG2iHrb1RhYFIhxIT0mwsna3GHwVVS4X3';
const NOTION_DB_ID = process.env.VITE_NOTION_DATABASE_ID || '34e197cb935d800893b3e3ac38f27dda';

const notion = new Client({ auth: NOTION_TOKEN });

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const data = req.body;
  console.log('[Notion] Incoming lead:', JSON.stringify(data));

  try {
    // Build properties — only include Email/ServiceType if database has those columns
    const properties = {
      Name: {
        title: [{ text: { content: data.name || 'Unknown Lead' } }]
      },
      Phone: {
        phone_number: data.phone || ''
      },
      Message: {
        rich_text: [{ text: { content: data.message || 'No message provided' } }]
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
    };

    // Add Email field if provided
    if (data.email) {
      properties['Email'] = { email: data.email };
    }

    // Add Service Type field if provided
    if (data.serviceType) {
      properties['Service Type'] = {
        select: { name: data.serviceType }
      };
    }

    const response = await notion.pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties
    });

    console.log('[Notion] Success! Page ID:', response.id);
    return res.status(200).json({ success: true, id: response.id });

  } catch (err) {
    console.error('[Notion] Error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
