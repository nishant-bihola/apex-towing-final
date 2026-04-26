/**
 * API for handling newsletter subscription requests.
 * Sends a branded confirmation email to the subscriber.
 */

const SUBSCRIBE_URL = import.meta.env.PROD
  ? '/api/subscribe'
  : 'http://localhost:5000/api/subscribe';

export const subscribeEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(SUBSCRIBE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Subscription failed');
    }

    return { success: true, message: 'Subscribed successfully!' };
  } catch (error) {
    console.error('Subscribe Error:', error);
    return { success: false, message: 'Failed to subscribe. Please try again.' };
  }
};
