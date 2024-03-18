
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
    {type: "project", name: "New project added"},
    {type: "blog", name: "new blog post: How to use flex-box"},
    {type: "project", name: "Project Z was added"}
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
generateActivityFeed ();

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
activityList.innerHTML ='';
activities.forEach(function(activity){
    var listItem = document.createElement('li');
    listItem.textContent = activity;
    activityList.appendChild(listItem);
});
}
displayActivities();


const tabBtn = document.querySelectorAll('.tab');
const tab = document.querySelectorAll('.tab-panel');

function tabs(panelIndex) {
    tab.forEach(function(node){
        node.style.display ='none';
        tabBtn.forEach(function(btn) {
            btn.parentElement.classList.remove('active');
        });
        tabBtn[panelIndex].parentElement.classList.add('active');
    });
    tab[panelIndex].style.display ='block';
}
tabs(0);

