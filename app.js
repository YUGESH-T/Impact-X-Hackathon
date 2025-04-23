const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
// const logs = document.querySelector('.container-01');


toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('expanded');
});


