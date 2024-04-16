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

    const validateInputs = (usernameValue, emailValue, passwordValue, password2Value) => {
        let isValid = true;

        if (usernameValue === '') {
            setError(username, "Username is required please!");
            isValid = false;
        } else if (!/^[a-zA-Z0-9_]{3,30}$/.test(usernameValue)) {
            setError(username, "Username must be alphanumeric and between 3 and 30 characters");
            isValid = false;
        } else { 
            setSuccess(username);
        }

        if (emailValue === '') {
            setError(email, "Email is required");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
            setError(email, "Provide a valid email address");
            isValid = false;
        } else {
            setSuccess(email);
        }

        if (passwordValue === '') {
            setError(password, "Password is required");
            isValid = false;
        } else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6,}/.test(passwordValue)) {
            setError(password, "Password must contain at least one digit, one letter, one special character, and be at least 6 characters long");
            isValid = false;
        } else {
            setSuccess(password);
        }

        if (password2Value === '') {
            setError(password2, "Confirm your password please");
            isValid = false;
        } else if (password2Value !== passwordValue) {
            setError(password2, "Passwords don't match");
            isValid = false;
        } else {
            setSuccess(password2);
        }
        return isValid;
    };

    myForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const password2Value = password2.value.trim();

        if (validateInputs(usernameValue, emailValue, passwordValue, password2Value)) {
            const userData = {
                username: usernameValue,
                email: emailValue,
                password: passwordValue
            };

            try {
                const response = await axios.post('http://localhost:3000/api/users/signup', userData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 201) {
                    alert("Signup completed! Please login");
                    window.location.href = "login page.html";
                    myForm.reset();
                } else {
                    console.error('Error signing up:', response.statusText);
                }
            } catch (error) {
                console.error('Error signing up:', error.message); 
            }
        }
    });
});
