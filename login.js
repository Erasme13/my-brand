
document.addEventListener('DOMContentLoaded', function(){
    var myLoginForm = document.getElementById('mylogin-form');
    myLoginForm.addEventListener('submit', function(event){
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var rememberMe = document.getElementById('remember-me').checked;
        if (rememberMe) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        }else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');

        }
        var storedUsers =[];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const userData = JSON.parse(localStorage.getItem(key));
            if (userData && userData.username && userData.password) {
                storedUsers.push(userData);
            }
        }
        var userFound = storedUsers.find(function(user){
            return user.username === username && user.password === password;
        });
        if (userFound) {
            alert ('Login successful');
            window.location.href = "index.html";
        } else {
            alert('invalid username or password! please try again.');
            document.getElementById('username').value = "";
            document.getElementById('password').value = "";
            document.getElementById('username').focus();
        }
    });
});


