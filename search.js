const termSelect = document.getElementById("termSelect");
const subjectInput = document.getElementById("subjectInput");
const subjectSuggestions = document.getElementById("subjectSuggestions");
const courseNumber = document.getElementById("courseNumber");

const morningOnly = document.getElementById("morningOnly");
const eveningOnly = document.getElementById("eveningOnly");
const openSeatsOnly = document.getElementById("openSeatsOnly");
const onlineOnly = document.getElementById("onlineOnly");
const majorReqOnly = document.getElementById("majorReqOnly");

const clearButton = document.getElementById("clearButton");
const searchButton = document.getElementById("searchButton");

const subjects = [
  "Computer Science", "Mathematics", "Statistics", "English", "French", "Engineering",
  "Psychology", "Japanese", "Communications", "Biology", "Chemistry", "Physics",
  "Economics", "Sociology", "History", "Political Science", "Philosophy",
  "Business Administration", "Nursing", "Art History"
];

subjectInput.addEventListener("input", () => {
  const typed = subjectInput.value.trim().toLowerCase();
  const matches = subjects.filter(subject => subject.toLowerCase().includes(typed));

  if (!typed || matches.length === 0) {
    subjectSuggestions.hidden = true;
    subjectSuggestions.innerHTML = "";
    return;
  }

  subjectSuggestions.innerHTML = "";
  matches.forEach(subject => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "subject-option";
    option.textContent = subject;
    option.addEventListener("click", () => {
      subjectInput.value = subject;
      subjectSuggestions.hidden = true;
    });
    subjectSuggestions.appendChild(option);
  });

  subjectSuggestions.hidden = false;
});

document.addEventListener("click", event => {
  if (!event.target.closest(".subject-autocomplete")) {
    subjectSuggestions.hidden = true;
  }
});

clearButton.addEventListener("click", () => {
  termSelect.selectedIndex = 0;
  subjectInput.value = "";
  courseNumber.value = "";
  morningOnly.checked = false;
  eveningOnly.checked = false;
  openSeatsOnly.checked = false;
  onlineOnly.checked = false;
  majorReqOnly.checked = false;
  subjectSuggestions.hidden = true;
});

searchButton.addEventListener("click", () => {
  const criteria = {
    term: termSelect.value || "Any term",
    subject: subjectInput.value.trim() || "Any subject",
    courseNumber: courseNumber.value.trim() || "Any number",
    morningOnly: morningOnly.checked,
    eveningOnly: eveningOnly.checked,
    openSeatsOnly: openSeatsOnly.checked,
    onlineOnly: onlineOnly.checked,
    majorReqOnly: majorReqOnly.checked
  };

  sessionStorage.setItem("searchCriteria", JSON.stringify(criteria));
  window.location.href = "results.html";
});
