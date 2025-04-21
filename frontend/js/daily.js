const TASKS_URL = 'http://localhost:5000/api/tasks';
const NOTES_URL = 'http://localhost:5000/api/notes';
const WATER_URL = 'http://localhost:5000/api/water';
const MOOD_URL = 'http://localhost:5000/api/moods';
const CONTACTS_URL = 'http://localhost:5000/api/contacts';

const user = JSON.parse(localStorage.getItem('user'));

// ===== TASKS =====
async function loadTasks() {
  const res = await fetch(`${TASKS_URL}/${user.id}`);
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `${task.title} <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Done'}</button>`;
    list.appendChild(li);
  });
}

async function addTask() {
  const title = document.getElementById('taskInput').value;
  const task_date = new Date().toISOString().slice(0, 10);
  if (!title.trim()) return;
  await fetch(TASKS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: user.id, title, task_date })
  });
  document.getElementById('taskInput').value = '';
  loadTasks();
}

async function toggleTask(id) {
  await fetch(`${TASKS_URL}/${id}/toggle`, { method: 'PUT' });
  loadTasks();
}

// ===== NOTES =====
async function loadNotes() {
  const res = await fetch(`${NOTES_URL}/${user.id}`);
  const notes = await res.json();
  const list = document.getElementById('noteList');
  list.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.innerText = note.content;
    list.appendChild(li);
  });
}

async function addNote() {
  const content = document.getElementById('noteInput').value;
  if (!content.trim()) return;
  await fetch(NOTES_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: user.id, content })
  });
  document.getElementById('noteInput').value = '';
  loadNotes();
}

// ===== WATER =====
async function loadWater() {
  const res = await fetch(`${WATER_URL}/${user.id}`);
  const data = await res.json();
  document.getElementById('waterTotal').innerText = data.total;
}

async function addWater() {
  const amount = parseInt(document.getElementById('waterInput').value);
  if (!amount || amount <= 0) return;
  await fetch(WATER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: user.id, amount })
  });
  document.getElementById('waterInput').value = '';
  loadWater();
}

// ===== MOOD =====
async function loadMood() {
  const res = await fetch(`${MOOD_URL}/${user.id}`);
  const data = await res.json();
  document.getElementById('currentMood').innerText = data?.mood || 'None yet';
}

async function saveMood() {
  const mood = document.getElementById('moodSelect').value;
  if (!mood) return;
  await fetch(MOOD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: user.id, mood })
  });
  loadMood();
}

// ===== CONTACTS =====
async function loadContacts() {
  const res = await fetch(`${CONTACTS_URL}/${user.id}`);
  const contacts = await res.json();
  const list = document.getElementById('contactList');
  list.innerHTML = '';
  contacts.forEach(contact => {
    const li = document.createElement('li');
    li.innerText = `${contact.name} - ${contact.email || ''} - ${contact.phone || ''} (${contact.label || ''})`;
    list.appendChild(li);
  });
}

async function addContact() {
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const phone = document.getElementById('contactPhone').value;
  const label = document.getElementById('contactLabel').value;

  if (!name.trim()) return;

  await fetch(CONTACTS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: user.id, name, email, phone, label })
  });

  document.getElementById('contactName').value = '';
  document.getElementById('contactEmail').value = '';
  document.getElementById('contactPhone').value = '';
  document.getElementById('contactLabel').value = '';

  loadContacts();
}

// ===== INIT =====
loadTasks();
loadNotes();
loadWater();
loadMood();
loadContacts();
