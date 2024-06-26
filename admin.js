// Performance metrics
var pageViews = 0;
var uniqueVisitors = 0;
var newVisitors = 0;

function updatePerformanceMetrics() {
    document.getElementById('pageViews').textContent = pageViews;
    document.getElementById('uniqueVisitors').textContent = uniqueVisitors;
    document.getElementById('newVisitors').textContent = newVisitors;
}
updatePerformanceMetrics();

// Recent activity
var activities = [
    { type: "project", name: "New project added" },
    { type: "blog", name: "new blog post: How to use flex-box" },
    { type: "project", name: "Project Z was added" }
];

function generateActivityFeed() {
    var activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';

    activities.forEach(function(activity) {
        listItem = document.createElement('li');
        listItem.classList.add('activity-item');
        var activityText = document.createElement('p');
        activityText.textContent = activity.name;
        listItem.appendChild(activityText);
        activityList.appendChild(listItem);
    });
}
generateActivityFeed();

// Track activity
function trackActivity(activity) {
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    activities.push(activity);
    localStorage.setItem('activities', JSON.stringify(activities));
}
trackActivity();

function displayActivities() {
    var activities = JSON.parse(localStorage.getItem('activities')) || [];

    // Display activities on the website
    var activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    activities.forEach(function(activity) {
        var listItem = document.createElement('li');
        listItem.textContent = activity;
        activityList.appendChild(listItem);
    });
}
displayActivities();

const tabBtn = document.querySelectorAll('.tab');
const tab = document.querySelectorAll('.tab-panel');

function tabs(panelIndex) {
    tab.forEach(function(node) {
        node.style.display = 'none';
    });
    tabBtn.forEach(function(btn) {
        btn.parentElement.classList.remove('active');
    });
    tab[panelIndex].style.display = 'block';
    tabBtn[panelIndex].parentElement.classList.add('active');
}
tabs(0);

document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch messages from the server
    function fetchMessages() {
        fetch('https://my-brand-backend-5-pk68.onrender.com/api/messages')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch messages');
                }
            })
            .then(data => {
                // Clear existing table rows
                const msgBody = document.getElementById('msg-body');
                msgBody.innerHTML = '';

                // Populate table with fetched messages
                data.forEach(message => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${message.firstname}</td>
                        <td>${message.lastname}</td>
                        <td>${message.email}</td>
                        <td>${message.phone}</td>
                        <td>${message.message}</td>
                    `;
                    msgBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
                // Display error message
                const errorMessage = document.querySelector('.messages .error-message');
                errorMessage.textContent = 'An error occurred while fetching messages.';
            });
    }

    // Call fetchMessages function when the DOM content is loaded
    fetchMessages();
});

// Fetching users 
document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch users from the server
    function fetchUsers() {
        fetch('https://my-brand-backend-5-pk68.onrender.com/api/users')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch users');
                }
            })
            .then(data => {
                // Clear existing table rows
                const usersBody = document.getElementById('user-body');
                usersBody.innerHTML = '';

                // Populate table with fetched users
                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user._id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                    `;
                    usersBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                // Display error message
                const errorMessage = document.querySelector('.error-message');
                errorMessage.textContent = 'An error occurred while fetching users.';
            });
    }

    // Call fetchUsers function when the DOM content is loaded
    fetchUsers();
});

// Adding blog

document.getElementById("add-btn").addEventListener("click", function() {
    var title = document.getElementById("title").value;
    var photo = document.getElementById("photo").value;
    var content = document.getElementById("content").value;

    var blogData = {
        title: title,
        photo: photo,
        content: content
    };

    var token = sessionStorage.getItem('userToken');
    var isAdmin = sessionStorage.getItem('isAdmin');

    console.log("isAdmin:", isAdmin); 

    // Check if isAdmin is 'true' (string) or true (boolean)
    if (isAdmin === 'true' || isAdmin === true) {
        fetch('https://my-brand-backend-5-pk68.onrender.com/api/addblog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(blogData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to add blog');
            }
        })
        .then(data => {
            console.log(data);
            alert(data.message); 
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while adding the blog. Please try again.');
        });

        document.getElementById("title").value = "";
        document.getElementById("photo").value = "";
        document.getElementById("content").value = "";
    } else {
        alert('You are not authorized to add a blog.');
    }
});



