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

// Function to fetch messages from backend using Axios
const fetchMessages = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/messages');
        if (!response.data) {
            throw new Error('Failed to fetch messages');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
};

const populateTable = async () => {
    try {
        const messages = await fetchMessages();
        const tbody = document.getElementById('msg-body');
        tbody.innerHTML = '';

        messages.forEach(message => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${message.firstname}</td>
                <td>${message.lastname}</td>
                <td>${message.email}</td>
                <td>${message.phone}</td>
                <td>${message.message}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error populating table with messages:', error);
    }
};

// Populate table on page load
populateTable();
