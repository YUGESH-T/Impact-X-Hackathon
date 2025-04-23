const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
// const logs = document.querySelector('.container-01');


toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('expanded');
});


let carbonSaved = 4.8;
let waterSaved = 32;
let energySaved = 1.3;
let currentPoints = 100;
const maxPoints = 500;


const carbonEl = document.querySelectorAll(".card .value")[0];
const waterEl = document.querySelectorAll(".card .value")[1];
const energyEl = document.querySelectorAll(".card .value")[2];
const pointsDisplay = document.querySelector(".streak-card p:last-of-type strong");
const progressBar = document.querySelector(".progress");


const actions = [
  { carbon: 1.0, water: 0, energy: 0.2, points: 10 },
  { carbon: 0.5, water: 0, energy: 0.1, points: 5 }, 
  { carbon: 0.3, water: 3, energy: 0.05, points: 3 }, 
  { carbon: 0.8, water: 0, energy: 0.1, points: 8 }  
];


function updateProgressBar(currentPoints) {
  const percentage = Math.min((currentPoints / maxPoints) * 100, 100);
  progressBar.style.width = `${percentage}%`;
  pointsDisplay.innerText = `${currentPoints} points`;
}

document.querySelectorAll(".quick-add button").forEach((button, index) => {
  button.addEventListener("click", () => {

    carbonSaved += actions[index].carbon;
    waterSaved += actions[index].water;
    energySaved += actions[index].energy;

    currentPoints = Math.min(currentPoints + actions[index].points, maxPoints);

    // Update DOM and the progress bar
    carbonEl.textContent = `${carbonSaved.toFixed(1)}kg`;
    waterEl.textContent = `${waterSaved.toFixed(0)}L`;
    energyEl.textContent = `${energySaved.toFixed(1)}kWh`;

    updateProgressBar(currentPoints);
  });
});
