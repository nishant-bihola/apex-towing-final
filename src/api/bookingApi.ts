/**
 * API for handling booking requests.
 * Sends to Express server (Supabase + Email) AND directly to /api/notion (Notion).
 */

export interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message?: string;
  location?: string;
  timestamp: string;
  source: 'Website Form' | 'AI Agent';
}

const BOOKING_URL = import.meta.env.PROD
  ? '/api/booking'
  : 'http://localhost:5000/api/booking';

// Dedicated Notion endpoint — always available on Vercel, never goes through Express
const NOTION_URL = '/api/notion';

export const submitServiceRequest = async (data: BookingRequest) => {
  console.log(`--- SENDING REQUEST FROM ${data.source} ---`);

  // Fire Notion call immediately in parallel — don't await, don't block form submission
  if (import.meta.env.PROD) {
    fetch(NOTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(r => r.json())
      .then(result => console.log('[Notion Direct]', result))
      .catch(err => console.error('[Notion Direct Error]', err));
  }

  try {
    const response = await fetch(BOOKING_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit request');
    }

    return {
      success: true,
      message: "Lead captured and email sent.",
      bookingId: `APEX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };

  } catch (error) {
    console.error("Booking Flow Error:", error);
    return {
      success: false,
      message: "Failed to connect to lead system. Please try calling us directly."
    };
  }
};

export const bookTowRequest = async (data: Omit<BookingRequest, 'source'>) => {
  return await submitServiceRequest({
    ...data,
    source: 'AI Agent'
  });
};
