/**
 * API for handling booking requests.
 * Uses a local proxy server to bypass CORS restrictions for Notion.
 */

export interface BookingRequest {
  name: string;
  email: string; // New email field
  phone: string;
  serviceType: string;
  message?: string;
  location?: string;
  timestamp: string;
  source: 'Website Form' | 'AI Agent';
}

const PROXY_URL = "http://localhost:5000/api/booking";

export const submitServiceRequest = async (data: BookingRequest) => {
  console.log(`--- SENDING REQUEST TO PROXY FROM ${data.source} ---`);
  
  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit request');
    }

    return {
      success: true,
      message: "Lead captured in Notion and email sent.",
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
