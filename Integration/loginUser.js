const form = document.querySelector("#mylogin-form");
const submitError = document.querySelector(".submit-error");
const submitSuccess = document.querySelector(".submit-success");

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

    // Remove popup after 5 seconds
    setTimeout(() => {
        alertPopup.remove();
    }, 5000);
}

const login = async (event) => {
    try {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const data = {
            email: email,
            password: password,
        };

        const response = await axios.post(
            "https://my-brand-backend-5-pk68.onrender.com/api/users/login",
            data
        );

        if (response.status === 200) {
            const token = response.data.token;
            const user = response.data.user;

            sessionStorage.setItem("userToken", token);
            sessionStorage.setItem("userId", user._id);
            sessionStorage.setItem("isAdmin", user.role === 'admin');
            submitSuccess.innerHTML = response.data.message;
            resetForm();
            next(user.role === 'admin');
            showAlert('Login successful!');
        } else {
            submitError.innerHTML = response.data.message;
        }
    } catch (error) {
        console.error("Error logging in a user:", error);
        if (error.response && error.response.data && error.response.data.message) {
            submitError.innerHTML = error.response.data.message;
        } else {
            submitError.innerHTML = "An unexpected error occurred.";
        }
    }
};

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === "/login page.html") {
        checkAuth();
    }
});

function checkAuth() {
    const userIsLoggedIn = sessionStorage.getItem("userToken");

    if (userIsLoggedIn) {
        window.location.href = "blog.html";
    }
}

const resetForm = () => {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    submitError.innerHTML = "";
    submitSuccess.innerHTML = "";
};

function next(isAdmin) {
    window.setTimeout(function () {
        if (isAdmin) {
            window.location.href = "admin panel.html";
        } else {
            window.location.href = "blog.html";
        }
    }, 1700);
}

if (!form) {
    console.error("Login form not found");
} else {
    form.addEventListener("submit", login);
}
