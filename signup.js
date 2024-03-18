document.addEventListener('DOMContentLoaded', function(){

    let myForm = document.getElementById('mysignup-form');
    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let password2 = document.getElementById('password2');

    
    const setError = (el, message) => {
        const inputControl = el.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    
    }
    const setSuccess = el => {
        const inputControl = el.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
        
    }
    const validEmail = (e) => {
        const regex = /\w+@\w+.\w+/;
        return regex.test(String(e).toLowerCase());
    
    };
    const validPassword = (p) => {
        const regex = /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{8,96}$/gmu;;
        return regex.test(p);
    }
    const validUser = (u) => {
        const re = /[^0-9]/;
        return re.test(u);
    }
    const validateInputs = (usernameValue, emailValue, passwordValue, password2Value) => {
        let isValid = true;

    if (localStorage.getItem(usernameValue)) {
        // setError(username, "Username is already taken")
        alert('This username is already registered')
        isValid = false; 
    }
    if (localStorage.getItem(emailValue)){
        // setError(email, "This email is already registered");
        alert('This email is already registered')
        isValid = false;
    }
    
    if (usernameValue === '') {
        setError(username, "Username is required please!");
        isValid = false;
    }else if (!validUser(usernameValue)) {
        setError(username, "digits are not allowed")
        isValid = false;
    }else { 
        setSuccess(username)
    }

    if (emailValue === '') {
        setError(email, "email is required");
        isValid = false;
    }else if(!validEmail(emailValue)) {
        setError(email, "provide valid email address please");
        isValid = false;
    } else {
        setSuccess(email);
    }
    if (passwordValue ==='') {
        setError(password, "Password is required");
        isValid = false;
    } else if (!validPassword(passwordValue)) {
        setError (password, "Password must contain at least one lowercase letter, one uppercase letter, one number, one symbol, and be at least 8 characters long")
        isValid = false;
    }else {
        setSuccess(password);
    }
    if (password2Value ==='') {
        setError(password2, "Comfirm your password please");
        isValid = false;
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords don't match");
        isValid = false;
    } else {
        setSuccess(password2);
    }
    return isValid;
};

        myForm.addEventListener('submit', (event) => {
            event.preventDefault();
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const password2Value = password2.value.trim();
           if (validateInputs(usernameValue, emailValue, passwordValue, password2Value)) {
        const userData = {username: usernameValue, email: emailValue, password: passwordValue};
              localStorage.setItem(usernameValue, JSON.stringify(userData));
              localStorage.setItem(emailValue, JSON.stringify(userData));
              alert ("Signup completed! pleaase login")
              window.location.href = "login page.html";
              myForm.reset();
           }
        
        });
    
});