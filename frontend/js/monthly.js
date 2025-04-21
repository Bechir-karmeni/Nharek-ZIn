const user = JSON.parse(localStorage.getItem('user'));
const GOALS_URL = 'http://localhost:5000/api/goals';

let currentGoalId = null;

// ========== GOALS ==========
async function loadGoals() {
  try {
    const res = await fetch(`${GOALS_URL}/${user.id}`);
    const goals = await res.json();

    for (let i = 0; i < 6; i++) {
      const el = document.getElementById(`goalText${i}`);
      const card = el?.parentElement;

      if (el && card) {
        const goal = goals[i];
        if (goal) {
          el.innerText = `${goal.name} (${goal.status})`;
          el.setAttribute('data-goal-id', goal.id);
          el.setAttribute('data-desc', goal.description || '');
          el.setAttribute('data-status', goal.status);

          card.className = 'goal-card';
          if (goal.status === 'Completed') {
            card.style.backgroundColor = '#d4edda';
          } else if (goal.status === 'In Progress') {
            card.style.backgroundColor = '#fff3cd';
          } else {
            card.style.backgroundColor = '#fff';
          }
        } else {
          el.innerText = "Click to add goal";
          el.removeAttribute('data-goal-id');
          el.removeAttribute('data-desc');
          el.removeAttribute('data-status');
          card.className = 'goal-card';
          card.style.backgroundColor = '#fff';
        }
      }
    }
  } catch (err) {
    console.error("Failed to load goals:", err);
  }
}

function editGoal(index) {
  const el = document.getElementById(`goalText${index}`);
  const name = el.innerText.includes('(') ? el.innerText.split(' (')[0] : '';
  const desc = el.getAttribute('data-desc') || '';
  const status = el.getAttribute('data-status') || 'In Progress';

  document.getElementById('goalIndex').value = index;
  document.getElementById('goalName').value = name;
  document.getElementById('goalDesc').value = desc;
  document.getElementById('goalStatus').value = status;

  currentGoalId = el.getAttribute('data-goal-id');
  document.getElementById('goalModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('goalModal').style.display = 'none';
  document.getElementById('goalForm').reset();
  currentGoalId = null;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('goalForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('goalName').value.trim();
      const description = document.getElementById('goalDesc').value.trim();
      const status = document.getElementById('goalStatus').value;

      if (!name) return alert("Goal name is required.");

      const body = {
        user_id: user.id,
        name,
        description,
        status
      };

      if (currentGoalId) body.id = parseInt(currentGoalId);

      try {
        const res = await fetch(GOALS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (!res.ok) throw new Error("Failed to save goal");

        closeModal();
        await loadGoals();
      } catch (err) {
        console.error("Goal save error:", err);
        alert("Failed to save goal. Check the console for details.");
      }
    });
  }

  generateCalendar();
  loadGoals();
});

// ========== CALENDAR ==========
function generateCalendar() {
  const container = document.getElementById('calendar');
  if (!container) return;

  container.innerHTML = '';

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDayOfMonth; i++) {
    const empty = document.createElement('div');
    container.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement('div');
    cell.className = 'day';
    cell.innerText = day;
    container.appendChild(cell);
  }
}

// ========== Make Global ==========
window.editGoal = editGoal;
window.closeModal = closeModal;
