const mockResults = [
  { code: "CS 444", title: "Advanced Web Development", status: "red", seats: "3 seats left", prereq: "Requires CS 310" },
  { code: "CS 310", title: "Data Structures", status: "green", seats: "12 seats left", prereq: "Requires CS 240" },
  { code: "CS 240", title: "Computer Organization", status: "green", seats: "FULL", prereq: "Requires CS 101", badge: "FULL" },
  { code: "CS 101", title: "Introduction to Computer Science", status: "orange", seats: "Completed", prereq: "No prerequisite" }
];

const chipRow = document.getElementById("chipRow");
const resultsList = document.getElementById("resultsList");

render();

function render() {
  chipRow.innerHTML = "";
  resultsList.innerHTML = "";

  mockResults.forEach(item => {
    const chip = document.createElement("div");
    chip.className = `chip ${item.status}`;
    chip.innerHTML = `<span class="dot ${item.status}"></span>${item.code}`;
    chipRow.appendChild(chip);

    const card = document.createElement("article");
    card.className = "result-card";
    card.style.borderLeftColor = statusColor(item.status);

    card.innerHTML = `
      <div class="result-top">
        <div>
          <div class="result-code"><span class="dot ${item.status}"></span>${item.code} ${item.badge ? `<span class="chip red" style="font-size:16px;padding:2px 10px;">${item.badge}</span>` : ""}</div>
          <div class="result-title">${item.title}</div>
        </div>
        <button class="result-toggle" aria-label="Toggle details">⌄</button>
      </div>
      <div class="result-details">${item.seats} • ${item.prereq}</div>
    `;

    card.querySelector(".result-toggle").addEventListener("click", () => {
      card.classList.toggle("open");
    });

    resultsList.appendChild(card);
  });
}

function statusColor(status) {
  if (status === "green") return "#4caf50";
  if (status === "red") return "#f44336";
  return "#f59e0b";
}