const serverURL = "https://my-brand-backend-5-pk68.onrender.com/api/addmessage";

const contact = async (event) => {
  try {
    event.preventDefault();

    const firstName = document.querySelector("#firstname").value;
    const lastName = document.querySelector("#lastname").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const message = document.querySelector("#message").value;

    const data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone: phone,
      message: message,
    };

    // Send data to the live server
    const response = await axios.post(`https://my-brand-backend-5-pk68.onrender.com`, data);

    if (response.status === 201) {
      console.log(response.data.message);
      submitSuccess.innerHTML = response.data.message;
      resetForm();
      document.querySelector('.submit-success').style.display = 'block';
      next();
    } else {
      submitError.innerHTML = response.data.error;
      console.error(response.data.error);
    }
  } catch (error) {
    console.error("Error sending message", error);
    if (error.response && error.response.data && error.response.data.error) {
      submitError.style.color = "#E87B7B";
      submitError.innerHTML = error.response.data.error;
    } else {
      submitError.innerHTML = "An unexpected error occurred.";
    }
  }
};
