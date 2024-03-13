
document.addEventListener('DOMContentLoaded', function(){
    var myLoginForm = document.getElementById('mylogin-form');
    myLoginForm.addEventListener('submit', function(event){
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var rememberMe = document.getElementById('remember-me').value;
        if (rememberMe) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        }else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');

        }
        
        var storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        var userFound = storedUsers.find(function(user) {
            return user.username == username && user.password == password;
        })
        if (userFound) {
            alert ('Login successful');
            window.location.href = "index.html";
        } else {
            alert('inavlid username or password! please try again.');
            document.getElementById('username').value = "";
            document.getElementById('password').value = "";
            document.getElementById('username').focus();
        }
    });
});


