const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get today's tasks for a user
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 AND task_date = $2 ORDER BY created_at DESC',
      [userId, today]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a task
router.post('/', async (req, res) => {
  const { user_id, title, task_date } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, task_date) VALUES ($1, $2, $3) RETURNING *',
      [user_id, title, task_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle complete
router.put('/:id/toggle', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      'UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *',
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
