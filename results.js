const mockResults = [
  { code: "CS 444", title: "Advanced Web Development", status: "red", open: false },
  {
    code: "CS 310",
    title: "Data Structures",
    status: "green",
    open: true,
    details: {
      instructor: "Prof. Michael Chen",
      time: "Tue, Thu 10:00 AM - 11:30 AM",
      location: "McCormack Hall 101",
      seats: "8 / 25"
    }
  },
  { code: "CS 240", title: "Computer Organization", status: "green", badge: "FULL", open: false },
  { code: "CS 101", title: "Introduction to Computer Science", status: "orange", open: false }
];

const chipRow = document.getElementById("chipRow");
const resultsList = document.getElementById("resultsList");

render();

function render() {
  chipRow.innerHTML = "";
  resultsList.innerHTML = "";

  mockResults.forEach((item, index) => {
    const chip = document.createElement("div");
    chip.className = `chip ${item.status}`;
    chip.innerHTML = `<span class="dot ${item.status}"></span>${item.code}`;
    chipRow.appendChild(chip);

    const card = document.createElement("article");
    card.className = `result-card ${item.open ? "open" : ""}`;
    card.style.borderLeftColor = statusColor(item.status);

    card.innerHTML = `
      <div class="result-top">
        <div>
          <div class="result-code"><span class="dot ${item.status}"></span>${item.code}${item.badge ? ` <span class="full-badge">${item.badge}</span>` : ""}</div>
          <div class="result-title">${item.title}</div>
        </div>
        <button class="result-toggle" aria-label="Toggle details">${item.open ? "⌃" : "⌄"}</button>
      </div>
      ${item.details ? `
      <div class="result-details">
        <div class="details-grid">
          <strong>Instructor:</strong><span>${item.details.instructor}</span>
          <strong>Time:</strong><span>${item.details.time}</span>
          <strong>Location:</strong><span>${item.details.location}</span>
          <strong>Available Seats:</strong><span>${item.details.seats}</span>
        </div>
        <button class="added-button" type="button">✓ Added to Schedule</button>
      </div>` : ""}
    `;

    card.querySelector(".result-toggle").addEventListener("click", () => {
      mockResults[index].open = !mockResults[index].open;
      render();
    });

    resultsList.appendChild(card);
  });
}

function statusColor(status) {
  if (status === "green") return "#4caf50";
  if (status === "red") return "#f44336";
  return "#f59e0b";
}
