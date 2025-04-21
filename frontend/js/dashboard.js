const user = JSON.parse(localStorage.getItem('user'));
const EXPENSES_URL = 'http://localhost:5000/api/expenses';
const TASKS_URL = 'http://localhost:5000/api/tasks';
const WATER_URL = 'http://localhost:5000/api/water';

let categoryChart;

// ========== EXPENSES ==========
async function loadExpenses() {
  try {
    const res = await fetch(`${EXPENSES_URL}/${user.id}`);
    const expenses = await res.json();

    // Calculate total budget
    const total = expenses.reduce((acc, exp) => {
      return exp.type === 'income' ? acc + exp.amount : acc - exp.amount;
    }, 0);
    document.getElementById('budgetTotal').innerText = total;

    // Display list
    const list = document.getElementById('expenseList');
    list.innerHTML = '';
    expenses.forEach(exp => {
      const li = document.createElement('li');
      li.textContent = `${exp.type.toUpperCase()} - ${exp.amount} DA (${exp.category || 'Uncategorized'} | ${exp.description || 'No description'})`;
      list.appendChild(li);
    });

    renderCategoryChart(expenses);
  } catch (error) {
    console.error('Error loading expenses:', error);
  }
}

async function addExpense() {
  const amount = parseInt(document.getElementById('amountInput').value);
  const description = document.getElementById('descInput').value.trim();
  const type = document.getElementById('typeSelect').value;
  const category = document.getElementById('categoryInput').value;

  if (!amount || !type || !category) {
    alert('Please fill in all required fields.');
    return;
  }

  try {
    await fetch(EXPENSES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        type,
        amount,
        description,
        category
      })
    });

    // Reset form
    document.getElementById('amountInput').value = '';
    document.getElementById('descInput').value = '';
    document.getElementById('categoryInput').value = '';
    document.getElementById('typeSelect').value = 'expense';

    loadExpenses();
  } catch (err) {
    console.error('Error adding expense:', err);
    alert('Failed to add expense.');
  }
}

// ========== CATEGORY CHART ==========
function renderCategoryChart(expenses) {
  const filtered = expenses.filter(exp => exp.type === 'expense');

  const categoryTotals = filtered.reduce((acc, exp) => {
    const key = exp.category || 'Uncategorized';
    acc[key] = (acc[key] || 0) + exp.amount;
    return acc;
  }, {});

  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  const totalSpent = values.reduce((sum, val) => sum + val, 0);

  const colors = [
    '#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0',
    '#9966ff', '#c9cbcf', '#ff9f40', '#8dd3c7',
    '#e67e22', '#2ecc71', '#e84393', '#6c5ce7'
  ];

  const ctx = document.getElementById('categoryChart').getContext('2d');

  if (categoryChart) {
    categoryChart.data.labels = labels;
    categoryChart.data.datasets[0].data = values;
    categoryChart.update();
  } else {
    categoryChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Expenses by Category',
          data: values,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' },
          tooltip: {
            callbacks: {
              label: function (context) {
                const category = context.label || 'Uncategorized';
                const amount = context.raw;
                const percentage = ((amount / totalSpent) * 100).toFixed(1);
                return `${category}: ${amount} DA (${percentage}%)`;
              }
            }
          },
          title: {
            display: true,
            text: 'Expense Breakdown by Category'
          }
        }
      }
    });
  }
}

// ========== TASKS ==========
async function loadTodayTasks() {
  try {
    const res = await fetch(`${TASKS_URL}/${user.id}`);
    const tasks = await res.json();
    const today = new Date().toISOString().slice(0, 10);
    const todayTasks = tasks.filter(task => task.task_date === today);

    const list = document.getElementById('todayTasks');
    list.innerHTML = '';
    todayTasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = `${task.title}${task.completed ? " ✅" : ""}`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

// ========== WATER ==========
async function loadWater() {
  try {
    const res = await fetch(`${WATER_URL}/${user.id}`);
    const data = await res.json();
    document.getElementById('waterTotal').innerText = data.total || 0;
  } catch (error) {
    console.error('Error loading water data:', error);
  }
}

// ========== QUOTE ==========
function loadQuote() {
  const quotes = [
    "Believe in yourself!",
    "Push harder than yesterday!",
    "Dream big. Work hard.",
    "Every day is a fresh start.",
    "You’ve got this!"
  ];
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quoteText').innerText = `"${random}"`;
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  loadExpenses();
  loadTodayTasks();
  loadWater();
  loadQuote();
});
