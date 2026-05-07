const termSelect = document.getElementById("termSelect");
const subjectSelect = document.getElementById("subjectSelect");
const courseNumber = document.getElementById("courseNumber");
const criteriaList = document.getElementById("criteriaList");

const addCriteriaButton = document.getElementById("addCriteriaButton");
const clearButton = document.getElementById("clearButton");
const searchButton = document.getElementById("searchButton");

let criteria = [];

addCriteriaButton.addEventListener("click", () => {
  const term = termSelect.value;
  const subject = subjectSelect.value;
  const number = courseNumber.value.trim();

  if (!term && !subject && !number) {
    return;
  }

  const newCriterion = {
    term: term || "Any term",
    subject: subject || "Any subject",
    courseNumber: number || "Any number"
  };

  criteria.push(newCriterion);
  renderCriteria();
});

clearButton.addEventListener("click", () => {
  termSelect.selectedIndex = 0;
  subjectSelect.selectedIndex = 0;
  courseNumber.value = "";
  criteria = [];
  renderCriteria();
});

searchButton.addEventListener("click", () => {
  const activeCriteria = criteria.length > 0 ? criteria : [{
    term: termSelect.value || "Any term",
    subject: subjectSelect.value || "Any subject",
    courseNumber: courseNumber.value.trim() || "Any number"
  }];

  sessionStorage.setItem("searchCriteria", JSON.stringify(activeCriteria));
  window.location.href = "results.html";
});

function renderCriteria() {
  criteriaList.innerHTML = "";

  criteria.forEach(item => {
    const pill = document.createElement("div");
    pill.className = "criteria-pill";
    pill.textContent = `${item.term} • ${item.subject} • ${item.courseNumber}`;
    criteriaList.appendChild(pill);
  });
}
