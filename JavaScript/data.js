const weeklyData = [
    { rank: 1, user: "GreenGuru", ecoPoints: 1250, co2Saved: 45.2, streak: 7 },
    { rank: 2, user: "EcoWarrior", ecoPoints: 1100, co2Saved: 38.7, streak: 5 },
    { rank: 3, user: "PlanetSaver", ecoPoints: 950, co2Saved: 32.1, streak: 4 },
    { rank: 4, user: "TreeHugger", ecoPoints: 800, co2Saved: 25.9, streak: 3 },
    { rank: 5, user: "ClimateChamp", ecoPoints: 650, co2Saved: 18.4, streak: 2 }
];

const monthlyData = [
    { rank: 1, user: "EcoWarrior", ecoPoints: 4500, co2Saved: 152.3, streak: 28 },
    { rank: 2, user: "GreenGuru", ecoPoints: 4200, co2Saved: 145.8, streak: 25 },
    { rank: 3, user: "ClimateChamp", ecoPoints: 3800, co2Saved: 129.6, streak: 22 },
    { rank: 4, user: "PlanetSaver", ecoPoints: 3500, co2Saved: 112.4, streak: 20 },
    { rank: 5, user: "TreeHugger", ecoPoints: 3000, co2Saved: 95.7, streak: 18 }
];

function populateLeaderboard(data) {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) {
        console.error("Error: Element with ID 'leaderboard-body' not found.");
        return;
    }
    tbody.innerHTML = '';
    data.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.rank}</td>
            <td>${entry.user}</td>
            <td>${entry.ecoPoints}</td>
            <td>${entry.co2Saved.toFixed(1)}</td>
            <td>${entry.streak}</td>
        `;
        tbody.appendChild(row);
    });
}

function initializeLeaderboard() {
    if (!document) {
        console.error("Error: Document object is not available.");
        return;
    }
    const tbody = document.getElementById('leaderboard-body');
    const tabs = document.querySelectorAll('.tab');

    if (!tbody) {
        console.error("Error: Leaderboard body element (#leaderboard-body) not found.");
        return;
    }
    if (tabs.length === 0) {
        console.error("Error: No tab elements (.tab) found.");
        return;
    }

    populateLeaderboard(weeklyData);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            populateLeaderboard(tab.textContent === 'Weekly' ? weeklyData : monthlyData);
        });
    });
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLeaderboard);
} else {
    initializeLeaderboard();
}