// My dropdowns
document.querySelector('.dropdwncontainer').addEventListener('mouseover', function (){
    document.getElementById('dropdown').style.display = 'block';
});
document.querySelector('.dropdwncontainer').addEventListener('mouseout', function() {
    document.getElementById('dropdown').style.display = 'none';
});
// my dropdowns for smaller screens
document.querySelector('.dropdwncontainer2').addEventListener ('mouseover', function() {
    document.getElementById('dropdown2').style.display = 'block';
});
document.querySelector('.dropdwncontainer2').addEventListener ('mouseout', function() {
    document.getElementById('dropdown2').style.display ='none'
})

// Toggle menu bar 
var togglebtn = document.querySelector('.toggle-btn');
var mymenu = document.querySelector('.mymenu');
togglebtn.addEventListener('click', () => {
    mymenu.classList.toggle('active');
});




