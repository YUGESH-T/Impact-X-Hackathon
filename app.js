const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
// const logs = document.querySelector('.container-01');


toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('expanded');
});


const data = {
    weekly: [
      { rank: 1, user: "Sarah J.", points: 135, co2: 26.2, streak: "7 days", badge: "🥇" },
      { rank: 2, user: "Michael T.", points: 122, co2: 24.8, streak: "5 days", badge: "🥈" },
      { rank: 3, user: "Emma W.", points: 118, co2: 22.5, streak: "8 days", badge: "🥉" },
      { rank: 4, user: "David L.", points: 105, co2: 19.4, streak: "4 days" },
      { rank: 5, user: "You", points: 98, co2: 18.2, streak: "7 days", me: true },
      { rank: 6, user: "Robert P.", points: 92, co2: 16.7, streak: "3 days" },
      { rank: 7, user: "Jessica M.", points: 85, co2: 14.5, streak: "5 days" },
      { rank: 8, user: "Kevin H.", points: 79, co2: 13.2, streak: "2 days" },
      { rank: 9, user: "Diana S.", points: 68, co2: 11.5, streak: "4 days" },
      { rank: 10, user: "Brian K.", points: 62, co2: 9.8, streak: "3 days" },
    ],
    monthly: [
      { rank: 1, user: "Emma W.", points: 520, co2: 102.5, streak: "29 days", badge: "🥇" },
      { rank: 2, user: "Sarah J.", points: 508, co2: 99.1, streak: "30 days", badge: "🥈" },
      { rank: 3, user: "Michael T.", points: 497, co2: 96.3, streak: "27 days", badge: "🥉" },
      { rank: 4, user: "You", points: 462, co2: 89.2, streak: "30 days", me: true },
      { rank: 5, user: "Robert P.", points: 421, co2: 84.3, streak: "24 days" },
      { rank: 6, user: "Jessica M.", points: 398, co2: 79.0, streak: "20 days" },
      { rank: 7, user: "David L.", points: 384, co2: 74.2, streak: "21 days" },
      { rank: 8, user: "Diana S.", points: 362, co2: 69.1, streak: "18 days" },
      { rank: 9, user: "Kevin H.", points: 344, co2: 66.8, streak: "19 days" },
      { rank: 10, user: "Brian K.", points: 322, co2: 61.3, streak: "17 days" },
    ],
  };
  
  function switchView(view) {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(t => t.classList.remove("active"));

    const index = view === "weekly" ? 0 : 1;
    tabs[index].classList.add("active");
  
    const tbody = document.getElementById("leaderboard-body");
    tbody.innerHTML = "";
  
    data[view].forEach(entry => {
      const tr = document.createElement("tr");
      if (entry.me) tr.classList.add("highlight");
  
      tr.innerHTML = `
        <td>${entry.rank} ${entry.badge || ""}</td>
        <td>${entry.user} ${entry.me ? '<span class="badge">You</span>' : ""}</td>
        <td>${entry.points}</td>
        <td>${entry.co2}</td>
        <td>${entry.streak}</td>
      `;
  
      tbody.appendChild(tr);
    });
  }
  
//   to import the data in the html
  document.addEventListener("DOMContentLoaded", () => {
    switchView("weekly");
  });

  