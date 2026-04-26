async function testBooking() {
  try {
    const res = await fetch('https://apex-towing-final.vercel.app/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test Lead via Script',
        email: 'biholanishant0@gmail.com',
        phone: '1234567890',
        service: 'Towing & Recovery',
        message: 'This is a test message to verify the email notification is working.',
        source: 'Website Form'
      })
    });
    
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (err) {
    console.error('Error:', err);
  }
}

testBooking();
