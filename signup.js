document.addEventListener('DOMContentLoaded', function() {
    const mySignupForm = document.getElementById('mysignup-form');

mySignupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var username =document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var rememberMe = document.getElementById('remember-me').checked;
    if(rememberMe) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    } else{
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }
    if(localStorage.getItem(username)) {
        alert('This account already exists');
    } else {
        localStorage.setItem(username, JSON.stringify({password: password}));
        alert('signup completed! please login')
        window.location.href = "login page.html";
    }
    mySignupForm.reset();
});
});