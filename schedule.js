let classes = [];
let openDetails = new Set();
let pendingDrops = new Set();
let highlightedClassId = null;

const calendar = document.getElementById("calendar");
const classTableBody = document.getElementById("classTableBody");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const backButton = document.getElementById("backButton");

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const timeColumnWidth = 105;
const rowHeight = 83;
const headerHeight = 60;
const pixelsPerMinute = rowHeight / 60;

loadClasses();

function loadClasses() {
  const savedClasses = sessionStorage.getItem("scheduleClasses");

  if (savedClasses) {
    classes = JSON.parse(savedClasses);
    renderPage();
    return;
  }

  fetch("classes.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Could not find classes.json");
      }

      return response.json();
    })
    .then(data => {
      classes = data.filter(course => course.selected);
      saveToSession();
      renderPage();
    })
    .catch(error => {
      console.error("Could not load classes.json:", error);
    });
}

function saveToSession() {
  sessionStorage.setItem("scheduleClasses", JSON.stringify(classes));
}

function renderPage() {
  renderCalendar();
  renderClassTable();
  updateActionButtons();
}

function renderCalendar() {
  calendar.innerHTML = "";

  const visibleClasses = classes.filter(course => !pendingDrops.has(course.id));

  const range = getCalendarRange(visibleClasses);
  const startHour = range.startHour;
  const endHour = range.endHour;
  const totalHours = endHour - startHour;

  calendar.style.gridTemplateColumns = `105px repeat(${days.length}, 1fr)`;
  calendar.style.gridTemplateRows = `60px repeat(${totalHours}, ${rowHeight}px)`;

  addCalendarHeader();

  for (let hour = startHour; hour < endHour; hour++) {
    const timeCell = document.createElement("div");
    timeCell.className = "time-cell";
    timeCell.textContent = formatHour(hour);
    calendar.appendChild(timeCell);

    days.forEach(() => {
      const gridCell = document.createElement("div");
      gridCell.className = "grid-cell";
      calendar.appendChild(gridCell);
    });
  }

  visibleClasses.forEach(course => {
    course.days.forEach(day => {
      if (!days.includes(day)) {
        return;
      }

      const block = document.createElement("div");
      block.className = "class-block";
      block.dataset.classId = course.id;

      const startMinutes = timeToMinutes(course.startTime);
      const endMinutes = timeToMinutes(course.endTime);

      const dayIndex = days.indexOf(day);
      const dayWidth = `calc((100% - ${timeColumnWidth}px) / ${days.length})`;

      block.style.left = `calc(${timeColumnWidth}px + ${dayIndex} * ${dayWidth} + 5px)`;
      block.style.width = `calc(${dayWidth} - 10px)`;
      block.style.top = `${headerHeight + (startMinutes - startHour * 60) * pixelsPerMinute}px`;
      block.style.height = `${(endMinutes - startMinutes) * pixelsPerMinute}px`;

      block.innerHTML = `
        <div class="class-title">${course.code} - ${course.title}</div>
        <div class="class-meta">${course.displayTime}</div>
        <div class="class-meta">${course.teacher}</div>
      `;

      block.addEventListener("click", () => {
        highlightedClassId = course.id;
        openDetails.add(course.id);
        renderClassTable();

        setTimeout(() => {
          highlightedClassId = null;
          renderClassTable();
        }, 1600);
      });

      calendar.appendChild(block);
    });
  });
}

function addCalendarHeader() {
  const timeHeader = document.createElement("div");
  timeHeader.className = "time-header";
  timeHeader.textContent = "Time";
  calendar.appendChild(timeHeader);

  days.forEach(day => {
    const dayHeader = document.createElement("div");
    dayHeader.className = "day-header";
    dayHeader.textContent = day;
    calendar.appendChild(dayHeader);
  });
}

function getCalendarRange(visibleClasses) {
  if (visibleClasses.length === 0) {
    return {
      startHour: 8,
      endHour: 18
    };
  }

  const startTimes = visibleClasses.map(course => timeToMinutes(course.startTime));
  const endTimes = visibleClasses.map(course => timeToMinutes(course.endTime));

  const earliestStart = Math.min(...startTimes);
  const latestEnd = Math.max(...endTimes);

  return {
    startHour: Math.floor(earliestStart / 60),
    endHour: Math.ceil(latestEnd / 60)
  };
}

function renderClassTable() {
  classTableBody.innerHTML = "";

  classes.forEach(course => {
    const isOpen = openDetails.has(course.id);
    const isPendingDrop = pendingDrops.has(course.id);

    const row = document.createElement("tr");
    row.className = "class-row";

    if (highlightedClassId === course.id) {
      row.classList.add("highlighted");
    }

    if (isPendingDrop) {
      row.classList.add("pending-drop");
    }

    row.innerHTML = `
      <td>${course.code} - ${course.title}</td>
      <td>${course.days.join(", ")}<br>${course.displayTime}</td>
      <td>${course.teacher}</td>
      <td>${course.classroom}</td>
      <td>
        <button class="details-toggle" data-id="${course.id}">
          ${isOpen ? "Hide details ^" : "Show details⌄"}
        </button>
      </td>
      <td>
        ${
          isPendingDrop
            ? `<button class="undo-button" data-id="${course.id}">Undo</button>`
            : `<button class="drop-button" data-id="${course.id}">Drop Class</button>`
        }
      </td>
    `;

    classTableBody.appendChild(row);

    if (isOpen) {
      const detailsRow = document.createElement("tr");
      detailsRow.className = "details-row";

      detailsRow.innerHTML = `
        <td colspan="6">
          <div class="details-content">
            <div>Credits: ${course.credits}</div>
            <div>Drop Deadline: ${course.dropDeadline}</div>

            <div class="class-description">Description: ${course.description}</div>
            <div>Instructor Email: <span class="plain-email">${course.email}</span></div>
          </div>
        </td>
      `;

      classTableBody.appendChild(detailsRow);
    }
  });

  attachTableButtonEvents();
}

function attachTableButtonEvents() {
  document.querySelectorAll(".details-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const classId = button.dataset.id;

      if (openDetails.has(classId)) {
        openDetails.delete(classId);
      } else {
        openDetails.add(classId);
      }

      renderClassTable();
    });
  });

  document.querySelectorAll(".drop-button").forEach(button => {
    button.addEventListener("click", () => {
      pendingDrops.add(button.dataset.id);
      renderPage();
    });
  });

  document.querySelectorAll(".undo-button").forEach(button => {
    button.addEventListener("click", () => {
      pendingDrops.delete(button.dataset.id);
      renderPage();
    });
  });
}

clearButton.addEventListener("click", () => {
  pendingDrops.clear();
  renderPage();
});

saveButton.addEventListener("click", () => {
  classes = classes.filter(course => !pendingDrops.has(course.id));
  pendingDrops.clear();
  saveToSession();
  renderPage();
});

backButton.addEventListener("click", () => {
  if (hasUnsavedChanges()) {
    const shouldLeave = confirm(
      "You have unsaved changes. If you leave this page, your pending drops will not be saved."
    );

    if (!shouldLeave) {
      return;
    }
  }

  window.location.href = "index.html";
});

window.addEventListener("beforeunload", event => {
  if (hasUnsavedChanges()) {
    event.preventDefault();
    event.returnValue = "";
  }
});

function updateActionButtons() {
  const hasPendingDrops = pendingDrops.size > 0;

  clearButton.disabled = !hasPendingDrops;
  saveButton.disabled = !hasPendingDrops;
}

function timeToMinutes(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatHour(hour) {
  if (hour === 0) {
    return "12:00 AM";
  }

  if (hour < 12) {
    return `${hour}:00 AM`;
  }

  if (hour === 12) {
    return "12:00 PM";
  }

  return `${hour - 12}:00 PM`;
}

function hasUnsavedChanges() {
  return pendingDrops.size > 0;
}