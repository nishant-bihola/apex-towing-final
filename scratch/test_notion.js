import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
dotenv.config();

const notion = new Client({ auth: 'ntn_u684166844597jG2iHrb1RhYFIhxIT0mwsna3GHwVVS4X3' });
const databaseId = '34e197cb935d800893b3e3ac38f27dda';

async function test() {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [{ text: { content: 'Test Lead' } }]
        },
        Phone: {
          phone_number: '1234567890'
        },
        Message: {
          rich_text: [{ text: { content: 'This is a test lead from the debug script.' } }]
        },
        Source: {
          select: { name: 'Website Form' }
        },
        Date: {
          date: { start: new Date().toISOString() }
        },
        Status: {
          status: { name: 'Not started' }
        }
      }
    });
    console.log('Success:', response.id);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
