
// Performance metrics
var pageViews = 500;
var uniqueVisitors = 200;
var newVisitors = 10;
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