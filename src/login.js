document.addEventListener('DOMContentLoaded', function(){
    var myLoginForm = document.getElementById('mylogin-form');
    myLoginForm.addEventListener('submit', function(event){
        event.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var role = document.getElementById('login-role').value;
        var rememberMe = document.getElementById('remember-me').checked;

        fetch('https://my-brand-backend-5-pk68.onrender.com/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                role: role,
                rememberMe: rememberMe
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid email or password');
            }
        })
        .then(data => {
            alert('Login successful');
            if (data.isAdmin) {
                window.location.href = "admin_panel.html";
            } else {
                window.location.href = "index.html";
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
    });
});