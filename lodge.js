const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
// const logs = document.querySelector('.container-01');


toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('expanded');
});

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.section');
    const co2SavedDisplay = document.querySelector('.impact-summary p:nth-child(2) strong');
    const ecoPointsDisplay = document.querySelector('.impact-summary p:nth-child(3) strong');
  
    // Transport variables
    const transportOptions = document.querySelectorAll('.transport-options .option');
    const distanceInput = document.getElementById('distance');
    let selectedTransport = 'Bicycle';
  
    const emissionData = {
      'Bicycle': { emission: 0, pointsPerKm: 1 },
      'Walking': { emission: 0, pointsPerKm: 1 },
      'Public Transit': { emission: 0.05, pointsPerKm: 0.5 },
      'Car': { emission: 0.2, pointsPerKm: 0.2 },
    };
  
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        sections.forEach((section, i) => {
          section.style.display = index === i ? 'block' : 'none';
        });
        updateImpact();
      });
    });
  
    // Transport selection
    transportOptions.forEach(option => {
      option.addEventListener('click', () => {
        transportOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        selectedTransport = option.innerText.split('\n')[0].split(' ')[1];
        updateImpact();
      });
    });
  
    distanceInput.addEventListener('input', () => {
      document.querySelector('.range-value').textContent = `${distanceInput.value} km`;
      updateImpact();
    });
  
    // Electricity
    const kwhInput = document.getElementById('kwh');
    kwhInput.addEventListener('input', () => {
      document.querySelector('.kwh-value').textContent = `${kwhInput.value} kWh`;
      updateImpact();
    //   distanceInput.style.display ="none";
    });
  
    // Consumption
    const checkboxes = document.querySelectorAll('.consumption');
    checkboxes.forEach(box => box.addEventListener('change', updateImpact));
  
    function updateImpact() {
      let co2 = 0, points = 0;
  
      const activeTab = document.querySelector('.tab.active').textContent;
  
      if (activeTab === 'Transport') {
        const distance = parseInt(distanceInput.value);
        const { emission, pointsPerKm } = emissionData[selectedTransport];
        co2 = (distance * (0.2 - emission)).toFixed(2);
        points = Math.round(distance * pointsPerKm);
      } 
      else if (activeTab === 'Electricity') {
        const kwh = parseInt(kwhInput.value);
        co2 = (kwh * 0.7).toFixed(2); 
        points = Math.max(0, 50 - kwh); 
      } 
      else if (activeTab === 'Consumption') {
        let count = 0;
        checkboxes.forEach(box => {
          if (box.checked) count++;
        });
        co2 = (count * 0.5).toFixed(2);
        points = count * 5;
      }
  
      co2SavedDisplay.textContent = `${co2} kg`;
      ecoPointsDisplay.textContent = `${points} pts`;
    }
  
    updateImpact();
  });