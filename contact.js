const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {};
    formData.forEach((value, key) => {
        payload[key] = value;
    });

    try {
        const response = await fetch('/api/addmessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            console.log('Message submitted successfully');
            // Redirect to Admin Dashboard
            window.location.href = 'Admin panel.html';
        } else {
            console.error('Failed to submit message');
        }
    } catch (error) {
        console.error('Error submitting message:', error);
    }
};

document.getElementById('contact-form').addEventListener('submit', handleSubmit);

