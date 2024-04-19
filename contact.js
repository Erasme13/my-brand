document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("message-form");
  const submitError = document.querySelector(".submit-error");

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

      const response = await axios.post("http://localhost:3000/api/addmessage", data);

      if (response.status === 201) {
        console.log(response.statusText);
        resetForm();
        // Populate table with the new message
        addMessageToTable(firstName, lastName, email, phone, message, 'msg-body');
      } else {
        submitError.innerHTML = "Failed to send message. Please try again.";
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message", error);
      submitError.innerHTML = "An unexpected error occurred.";
    }
  };

  const resetForm = () => {
    document.querySelector("#firstname").value = "";
    document.querySelector("#lastname").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#message").value = "";
    submitError.innerHTML = "";
  };

  const addMessageToTable = (firstName, lastName, email, phone, message, tableBodyId) => {
    const messagesTableBody = document.getElementById(tableBodyId);
    if (!messagesTableBody) {
      console.error("Messages table body not found");
      return;
    }

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>${message}</td>
    `;
    messagesTableBody.appendChild(newRow);
  };

  form.addEventListener("submit", contact);
});
