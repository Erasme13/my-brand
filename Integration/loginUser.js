document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('mylogin-form');

    // Function to handle form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form data
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('login-role').value;
        const rememberMe = document.getElementById('remember-me').checked;

        // Send login request to server
        fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to login');
            }
        })
        .then(data => {
            // Store token in localStorage if "Remember me" is checked
            if (rememberMe) {
                localStorage.setItem('token', data.token);
            }

            // Show success message
            showAlert('Login successful! Redirecting...');

            // Redirect based on user role
            if (role === 'admin') {
                window.location.href = 'admin panel.html';
            } else {
                window.location.href = 'blog.html';
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Failed to login. Please check your email and password.');
        });
    });

    // Function to show alert popup
function showAlert(message) {
    const alertPopup = document.createElement('div');
    alertPopup.classList.add('alert-popup');
    alertPopup.textContent = message;
    document.body.appendChild(alertPopup);

    // Style the popup
    alertPopup.style.position = 'fixed';
    alertPopup.style.top = '50%';
    alertPopup.style.left = '50%';
    alertPopup.style.transform = 'translate(-50%, -50%)';
    alertPopup.style.padding = '20px';
    alertPopup.style.backgroundColor = 'white';
    alertPopup.style.color = 'green';
    alertPopup.style.borderRadius = '5px';
    alertPopup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    alertPopup.style.zIndex = '9999';

    // Remove popup after 3 seconds
    setTimeout(() => {
        alertPopup.remove();
    }, 5000);
}

});
