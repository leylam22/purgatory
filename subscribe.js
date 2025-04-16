document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('email-input');
    const responseMsg = document.getElementById('response-msg');
  
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      const email = emailInput.value;
  
      try {
        const response = await fetch('https://localhost:5123/api/EmailSubscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email })
        });
  
        if (response.ok) {
          const data = await response.json();
          responseMsg.innerText = data.message;
          responseMsg.style.color = 'green';
        } else {
          const errorData = await response.json();
          responseMsg.innerText = errorData.email?.[0] || errorData || 'Something went wrong!';
          responseMsg.style.color = 'red';
        }
      } catch (error) {
        responseMsg.innerText = 'Error connecting to server.';
        responseMsg.style.color = 'red';
      }
    });
  });
  