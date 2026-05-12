const mockResults = [
  {
    id: "cs444",
    code: "CS 444",
    catalogNumber: "3745",
    title: "Advanced Web Development",
    description: "Builds modern full-stack web applications with component architectures, APIs, authentication, and deployment workflows.",
    subject: "Computer Science",
    status: "red",
    open: false,
    added: false,
    scheduleCourse: {
      id: "cs444",
      code: "CS 444",
      title: "Advanced Web Development",
      days: ["Mon", "Wed"],
      startTime: "13:00",
      endTime: "14:15",
      displayTime: "1:00 PM - 2:15 PM",
      teacher: "Prof. Michael Chen",
      classroom: "Innovation Hall 222",
      credits: 3,
      description: "Advanced client/server web architecture with modern frontend frameworks and backend integration.",
      email: "mchen@university.edu",
      dropDeadline: "May 1, 2026",
      selected: true
    },
    details: {
      instructor: "Prof. Michael Chen",
      time: "Mon, Wed 1:00 PM - 2:15 PM",
      location: "Innovation Hall 222",
      seats: "3 / 30"
    }
  },
  {
    id: "cs310",
    code: "CS 310",
    catalogNumber: "3310",
    title: "Data Structures",
    description: "Covers lists, trees, graphs, hash tables, and performance analysis for efficient data organization.",
    subject: "Computer Science",
    status: "green",
    open: true,
    added: false,
    scheduleCourse: {
      id: "cs310",
      code: "CS 310",
      title: "Data Structures",
      days: ["Tue", "Thu"],
      startTime: "10:00",
      endTime: "11:30",
      displayTime: "10:00 AM - 11:30 AM",
      teacher: "Prof. Michael Chen",
      classroom: "McCormack Hall 101",
      credits: 3,
      description: "Core data structures and algorithm analysis for scalable software development.",
      email: "mchen@university.edu",
      dropDeadline: "May 2, 2026",
      selected: true
    },
    details: {
      instructor: "Prof. Michael Chen",
      time: "Tue, Thu 10:00 AM - 11:30 AM",
      location: "McCormack Hall 101",
      seats: "8 / 25"
    }
  },
  {
    id: "cs240",
    code: "CS 240",
    catalogNumber: "3240",
    title: "Computer Organization",
    description: "Introduces digital logic, CPU organization, memory hierarchy, assembly language, and low-level performance concepts.",
    subject: "Computer Science",
    status: "green",
    badge: "FULL",
    open: false,
    added: false,
    scheduleCourse: {
      id: "cs240",
      code: "CS 240",
      title: "Computer Organization",
      days: ["Mon", "Wed"],
      startTime: "15:30",
      endTime: "17:00",
      displayTime: "3:30 PM - 5:00 PM",
      teacher: "Prof. Ana Ruiz",
      classroom: "Engineering Hall 105",
      credits: 3,
      description: "Architecture and machine-level programming foundations.",
      email: "aruiz@university.edu",
      dropDeadline: "May 4, 2026",
      selected: true
    },
    details: {
      instructor: "Prof. Ana Ruiz",
      time: "Mon, Wed 3:30 PM - 5:00 PM",
      location: "Engineering Hall 105",
      seats: "0 / 28"
    }
  },
  {
    id: "cs101",
    code: "CS 101",
    catalogNumber: "3101",
    title: "Introduction to Computer Science",
    description: "A foundational survey of problem-solving, programming basics, computational thinking, and software tools.",
    subject: "Computer Science",
    status: "orange",
    open: false,
    added: false,
    scheduleCourse: {
      id: "cs101",
      code: "CS 101",
      title: "Introduction to Computer Science",
      days: ["Tue", "Thu"],
      startTime: "09:00",
      endTime: "10:15",
      displayTime: "9:00 AM - 10:15 AM",
      teacher: "Prof. Samir Patel",
      classroom: "Science Center 008",
      credits: 3,
      description: "Introduction to CS fundamentals and programming practice.",
      email: "spatel@university.edu",
      dropDeadline: "May 1, 2026",
      selected: true
    },
    details: {
      instructor: "Prof. Samir Patel",
      time: "Tue, Thu 9:00 AM - 10:15 AM",
      location: "Science Center 008",
      seats: "Completed"
    }
  },
  {
    id: "cs472",
    code: "CS 472",
    catalogNumber: "3472",
    title: "Machine Learning",
    description: "Supervised and unsupervised learning methods, model evaluation, and practical ML workflows.",
    subject: "Computer Science",
    status: "green",
    open: false,
    added: false,
    scheduleCourse: { id: "cs472", code: "CS 472", title: "Machine Learning", days: ["Tue"], startTime: "14:00", endTime: "16:30", displayTime: "2:00 PM - 4:30 PM", teacher: "Prof. Nia Gupta", classroom: "Tech Hall 302", credits: 3, description: "Applied machine learning concepts and systems.", email: "ngupta@university.edu", dropDeadline: "May 5, 2026", selected: true },
    details: { instructor: "Prof. Nia Gupta", time: "Tue 2:00 PM - 4:30 PM", location: "Tech Hall 302", seats: "6 / 24" }
  },
  {
    id: "cs420",
    code: "CS 420",
    catalogNumber: "3420",
    title: "Database Systems",
    description: "Relational design, SQL, indexing, transactions, and data modeling for scalable applications.",
    subject: "Computer Science",
    status: "green",
    open: false,
    added: false,
    scheduleCourse: { id: "cs420", code: "CS 420", title: "Database Systems", days: ["Fri"], startTime: "10:00", endTime: "12:30", displayTime: "10:00 AM - 12:30 PM", teacher: "Prof. Lila Wang", classroom: "Data Lab 210", credits: 3, description: "Database architecture and practical SQL development.", email: "lwang@university.edu", dropDeadline: "May 6, 2026", selected: true },
    details: { instructor: "Prof. Lila Wang", time: "Fri 10:00 AM - 12:30 PM", location: "Data Lab 210", seats: "10 / 30" }
  },
  {
    id: "cs429",
    code: "CS 429",
    catalogNumber: "3429",
    title: "Cloud Computing",
    description: "Cloud service models, distributed infrastructure, containers, and resilient deployment design.",
    subject: "Computer Science",
    status: "red",
    open: false,
    added: false,
    scheduleCourse: { id: "cs429", code: "CS 429", title: "Cloud Computing", days: ["Thu"], startTime: "16:00", endTime: "18:00", displayTime: "4:00 PM - 6:00 PM", teacher: "Prof. Eric Nolan", classroom: "Systems Hall 118", credits: 3, description: "Cloud architecture and distributed systems practices.", email: "enolan@university.edu", dropDeadline: "May 6, 2026", selected: true },
    details: { instructor: "Prof. Eric Nolan", time: "Thu 4:00 PM - 6:00 PM", location: "Systems Hall 118", seats: "12 / 30" }
  },
  {
    id: "cs452",
    code: "CS 452",
    catalogNumber: "3452",
    title: "Operating Systems",
    description: "Process scheduling, memory management, file systems, concurrency, and OS-level abstractions.",
    subject: "Computer Science",
    status: "green",
    open: false,
    added: false,
    scheduleCourse: { id: "cs452", code: "CS 452", title: "Operating Systems", days: ["Mon", "Wed"], startTime: "11:00", endTime: "12:15", displayTime: "11:00 AM - 12:15 PM", teacher: "Prof. Omar Zaid", classroom: "Kernel Lab 112", credits: 3, description: "Systems programming and OS internals.", email: "ozaid@university.edu", dropDeadline: "May 7, 2026", selected: true },
    details: { instructor: "Prof. Omar Zaid", time: "Mon, Wed 11:00 AM - 12:15 PM", location: "Kernel Lab 112", seats: "5 / 22" }
  }
];

const chipRow = document.getElementById("chipRow");
const resultsList = document.getElementById("resultsList");
const searchCriteria = JSON.parse(sessionStorage.getItem("searchCriteria") || "{}");

hydrateAddedStateFromSchedule();
render();

function hydrateAddedStateFromSchedule() {
  const scheduleClasses = JSON.parse(sessionStorage.getItem("scheduleClasses") || "[]");
  const ids = new Set(scheduleClasses.map(course => course.id));
  mockResults.forEach(course => {
    course.added = ids.has(course.id);
  });
}

function render() {
  chipRow.innerHTML = "";
  resultsList.innerHTML = "";

  const visibleResults = mockResults
    .filter(matchesCriteria)
    .sort((a, b) => extractCourseNumber(a.code) - extractCourseNumber(b.code));

  visibleResults.forEach(item => {
    const index = mockResults.indexOf(item);
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
          <div class="result-description">${item.description}</div>
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
        ${isBlocked ? `<p class="blocked-status show">${blockedForRequirements ? "You do not meet the requirements for this class." : "This class is full and cannot be added right now."}</p>` : ""}
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
        syncScheduleClasses();
        render();
      });
    }

    resultsList.appendChild(card);
  });
}

function syncScheduleClasses() {
  const current = JSON.parse(sessionStorage.getItem("scheduleClasses") || "[]");
  const byId = new Map(current.map(course => [course.id, course]));

  mockResults.forEach(course => {
    if (course.added) {
      byId.set(course.id, course.scheduleCourse);
    } else if (byId.has(course.id)) {
      byId.delete(course.id);
    }
  });

  sessionStorage.setItem("scheduleClasses", JSON.stringify(Array.from(byId.values())));
}

function matchesCriteria(item) {
  const typedSubject = (searchCriteria.subject || "").toLowerCase();
  const typedNumber = (searchCriteria.courseNumber || "").toLowerCase();

  const bySubject = typedSubject === "" || typedSubject === "any subject" || item.subject.toLowerCase().includes(typedSubject) || item.title.toLowerCase().includes(typedSubject) || item.code.toLowerCase().includes(typedSubject);
  const byNumber = typedNumber === "" || typedNumber === "any number" || item.catalogNumber.includes(typedNumber) || item.code.replace(" ", "").toLowerCase().includes(typedNumber);

  return bySubject && byNumber;
}

function extractCourseNumber(code) {
  const match = code.match(/(\d+)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function statusColor(status) {
  if (status === "green") return "#4caf50";
  if (status === "red") return "#f44336";
  return "#f59e0b";
}
