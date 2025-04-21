const user = JSON.parse(localStorage.getItem('user'));
const TASKS_URL = 'http://localhost:5000/api/tasks';

let selectedDate = '';
let selectedHour = '';

// Render the calendar
async function loadCalendar() {
  const res = await fetch(`${TASKS_URL}/${user.id}`);
  const tasks = await res.json();
  const container = document.getElementById('calendarBody');
  container.innerHTML = '';

  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Sunday

  for (let hour = 0; hour < 24; hour++) {
    const timeLabel = document.createElement('div');
    timeLabel.className = 'time-label';
    timeLabel.textContent = `${hour.toString().padStart(2, '0')}:00`;
    container.appendChild(timeLabel);

    for (let day = 0; day < 7; day++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-cell';

      const cellDate = new Date(startOfWeek);
      cellDate.setDate(startOfWeek.getDate() + day);
      const dateStr = cellDate.toISOString().split('T')[0];
      const hourStr = hour.toString().padStart(2, '0');

      // Make cell clickable to add task
      cell.onclick = () => openTaskPopup(dateStr, `${hourStr}:00:00`);

      // Filter tasks by exact date and HOUR
      const cellTasks = tasks.filter(task => {
        const taskHour = task.time?.split(':')[0];
        return (
          task.task_date === dateStr &&
          taskHour === hourStr
        );
      });

      // Render each task in the cell
      cellTasks.forEach(task => {
        const div = document.createElement('div');
        div.textContent = `${task.title} (${task.time?.slice(0, 5)})`;
        div.title = task.description || '';
        div.className = 'task-block'; // Style it!
        cell.appendChild(div);
      });

      container.appendChild(cell);
    }
  }
}

// Open popup with selected date & time
function openTaskPopup(dateStr, hourStr) {
  selectedDate = dateStr;
  selectedHour = hourStr;
  document.getElementById('modalDate').textContent = dateStr;
  document.getElementById('modalHour').textContent = hourStr;
  document.getElementById('taskPopup').style.display = 'block';
  document.getElementById('popupTitle').focus();
}

// Close popup modal
function closePopup() {
  document.getElementById('taskPopup').style.display = 'none';
  document.getElementById('popupForm').reset();
}

// Submit task
async function submitPopupTask(e) {
  e.preventDefault();

  const title = document.getElementById('popupTitle').value;
  const description = document.getElementById('popupDescription').value;

  if (!title.trim()) return alert("Title is required.");

  const response = await fetch(TASKS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: user.id,
      title,
      task_date: selectedDate,
      time: selectedHour,
      description
    })
  });

  if (response.ok) {
    closePopup();
    await loadCalendar(); // 🔁 Wait for calendar to fully reload
  } else {
    alert("Failed to save task.");
  }
}

// Events
document.getElementById('popupForm').addEventListener('submit', submitPopupTask);
document.getElementById('closePopupBtn').addEventListener('click', closePopup);

// Initial load
loadCalendar();
