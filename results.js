const mockResults = [
  {
    code: "CS 444",
    title: "Advanced Web Development",
    status: "red",
    open: false,
    added: false,
    details: {
      instructor: "Prof. Michael Chen",
      time: "Mon, Wed 1:00 PM - 2:15 PM",
      location: "Innovation Hall 222",
      seats: "3 / 30"
    }
  },
  {
    code: "CS 310",
    title: "Data Structures",
    status: "green",
    open: true,
    added: false,
    details: {
      instructor: "Prof. Michael Chen",
      time: "Tue, Thu 10:00 AM - 11:30 AM",
      location: "McCormack Hall 101",
      seats: "8 / 25"
    }
  },
  {
    code: "CS 240",
    title: "Computer Organization",
    status: "green",
    badge: "FULL",
    open: false,
    added: false,
    details: {
      instructor: "Prof. Ana Ruiz",
      time: "Mon, Wed 3:30 PM - 5:00 PM",
      location: "Engineering Hall 105",
      seats: "0 / 28"
    }
  },
  {
    code: "CS 101",
    title: "Introduction to Computer Science",
    status: "orange",
    open: false,
    added: false,
    details: {
      instructor: "Prof. Samir Patel",
      time: "Tue, Thu 9:00 AM - 10:15 AM",
      location: "Science Center 008",
      seats: "Completed"
    }
  }
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
    chip.textContent = item.code;
    chipRow.appendChild(chip);

    const card = document.createElement("article");
    card.className = `result-card ${item.open ? "open" : ""}`;
    card.style.borderLeftColor = statusColor(item.status);

    const blockedForRequirements = item.status === "red";
    const blockedForFull = item.badge === "FULL" || item.details.seats.startsWith("0 /");
    const isBlocked = blockedForRequirements || blockedForFull;
    const buttonLabel = isBlocked
      ? blockedForRequirements
        ? "Cannot Add (Requirements Not Met)"
        : "Cannot Add (Class Full)"
      : item.added
        ? "✓ Added to Schedule (Click to Remove)"
        : "Add to Schedule";

    card.innerHTML = `
      <div class="result-top">
        <div>
          <div class="result-code"><span class="dot ${item.status}"></span>${item.code}${item.badge ? ` <span class="full-badge">${item.badge}</span>` : ""}</div>
          <div class="result-title">${item.title}</div>
        </div>
        <button class="result-toggle" aria-label="Toggle details">${item.open ? "⌃" : "⌄"}</button>
      </div>
      <div class="result-details">
        <div class="details-grid">
          <strong>Instructor:</strong><span>${item.details.instructor}</span>
          <strong>Time:</strong><span>${item.details.time}</span>
          <strong>Location:</strong><span>${item.details.location}</span>
          <strong>Available Seats:</strong><span>${item.details.seats}</span>
        </div>
        <button class="added-button ${isBlocked ? "blocked" : ""}" data-index="${index}" type="button" ${isBlocked ? "disabled" : ""}>${buttonLabel}</button>
        <p class="add-status ${item.added ? "show" : ""}">${item.added ? `${item.code} added. Click again to remove.` : ""}</p>
        ${isBlocked ? `<p class="blocked-status show">${blockedForRequirements ? "This class does not meet your requirements and cannot be added." : "This class is full and cannot be added right now."}</p>` : ""}
      </div>
    `;

    card.querySelector(".result-toggle").addEventListener("click", () => {
      mockResults[index].open = !mockResults[index].open;
      render();
    });

    const addButton = card.querySelector(".added-button");
    if (!isBlocked) {
      addButton.addEventListener("click", () => {
        mockResults[index].added = !mockResults[index].added;
        render();
      });
    }

    resultsList.appendChild(card);
  });
}

function statusColor(status) {
  if (status === "green") return "#4caf50";
  if (status === "red") return "#f44336";
  return "#f59e0b";
}
