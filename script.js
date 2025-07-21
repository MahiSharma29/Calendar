const calendarDays = document.getElementById("calendar-days");
const monthYear = document.getElementById("month-year");
const yearDropdown = document.getElementById("year");

let currentDate = new Date();

function populateYearDropdown() {
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 50; y <= currentYear + 50; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    if (y === currentDate.getFullYear()) {
      option.selected = true;
    }
    yearDropdown.appendChild(option);
  }
}

function goToYear() {
  const selectedYear = parseInt(yearDropdown.value);
  currentDate.setFullYear(selectedYear);
  renderCalendar(currentDate);
}

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

  calendarDays.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    calendarDays.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= totalDays; day++) {
    calendarDays.innerHTML += `<div>${day}</div>`;
  }

  yearDropdown.value = year;
}

function changeMonth(step) {
  currentDate.setMonth(currentDate.getMonth() + step);
  renderCalendar(currentDate);
}

populateYearDropdown();
renderCalendar(currentDate);
