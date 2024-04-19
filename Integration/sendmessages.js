document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('message-form');

  // Add event listener to form submission
  contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Get form data
      const firstNameInput = document.getElementById('firstname').value;
      const lastNameInput = document.getElementById('lastname').value;
      const emailInput = document.getElementById('email').value;
      const phoneInput = document.getElementById('phone').value;
      const messageInput = document.getElementById('message').value;

      // Construct message object
      const messageData = {
          firstname: firstNameInput,
          lastname: lastNameInput,
          email: emailInput,
          phone: phoneInput,
          message: messageInput
      };

      // Send POST request to backend
      fetch('http://localhost:3000/api/addmessage', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(messageData)
      })
      .then(response => {
          if (response.ok) {
              // Reset form on successful submission
              contactForm.reset();
              // Display success message
              const successMessage = document.querySelector('.submit-success');
              successMessage.textContent = 'Message sent successfully!';
          } else {
              // Display error message
              const errorMessage = document.querySelector('.submit-error');
              errorMessage.textContent = 'Failed to submit form. Please try again later.';
          }
      })
      .catch(error => {
          console.error('Error:', error);
          // Display error message
          const errorMessage = document.querySelector('.submit-error');
          errorMessage.textContent = 'An error occurred while submitting the form.';
      });
  });
});
