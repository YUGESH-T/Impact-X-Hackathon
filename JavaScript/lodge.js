const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const import_text = toggleBtn.querySelector('i'); 
const co2produced = document.getElementById('cause');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('expanded');
  import_text.innerText = sidebar.classList.contains('expanded') ? ' Green Habits' : '';
});

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('.section');
  const co2SavedDisplay = document.querySelector('.impact-summary p:nth-child(2) strong');
  const ecoPointsDisplay = document.querySelector('.impact-summary p:nth-child(3) strong');

  const transportOptions = document.querySelectorAll('.transport-options .option');
  const distanceInput = document.getElementById('distance');
  let selectedTransport = 'Bicycle';

  const emissionData = {
    'Bicycle': { emission: 0, pointsPerKm: 1 },
    'Walking': { emission: 0, pointsPerKm: 1 },
    'Public-Transport': { emission: 0.05, pointsPerKm: 0.5 },
    'Car': { emission: 0.2, pointsPerKm: 0.1 },
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

  const kwhInput = document.getElementById('kwh');
  kwhInput.addEventListener('input', () => {
    document.querySelector('.kwh-value').textContent = `${kwhInput.value} kWh`;
    updateImpact();
  });

  const checkboxes = document.querySelectorAll('.consumption');
  checkboxes.forEach(box => box.addEventListener('change', updateImpact));

  function updateImpact() {
    let co2 = 0, points = 0;
    const activeTab = document.querySelector('.tab.active').textContent;

    if (activeTab === 'Transport') {
      const distance = parseInt(distanceInput.value) || 0;
      const { emission, pointsPerKm } = emissionData[selectedTransport];

      if (selectedTransport === 'Car') {
        co2 = (distance * emission).toFixed(2); 
        points = 0;
        co2produced.innerHTML = `CO<sub>2</sub> Produced: <strong>${co2} kg</strong>`;
      } 
      else if(selectedTransport === 'Public-Transport'){
        co2 = (distance * emission).toFixed(2); 
        points = 0;
        co2produced.innerHTML = `CO<sub>2</sub> Produced: <strong>${co2} kg</strong>`;
      }
      else {
        co2 = (distance * (0.2 - emission)).toFixed(2);
        points = Math.round(distance * pointsPerKm);
        co2produced.innerHTML = `CO<sub>2</sub> Saved: <strong>${co2} kg</strong>`;
      }
    } else if (activeTab === 'Electricity') {
      const kwh = parseInt(kwhInput.value) || 0;
      co2 = (kwh * 0.7).toFixed(2); 
      points = Math.max(0, 50 - kwh);
      co2produced.innerHTML = `CO<sub>2</sub> Produced: <strong>${co2} kg</strong>`;
    } else if (activeTab === 'Consumption') {
      let count = 0;
      checkboxes.forEach(box => {
        if (box.checked) count++;
      });
      co2 = (count * 0.5).toFixed(2);
      points = count * 5;
      co2produced.innerHTML = `CO<sub>2</sub> Saved: <strong>${co2} kg</strong>`;
    }

    co2SavedDisplay.textContent = `${co2} kg`;
    ecoPointsDisplay.textContent = `${points} pts`;
  }

  updateImpact();
});
