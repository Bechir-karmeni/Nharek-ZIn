const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all goals
router.get('/:userId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM goals WHERE user_id = $1 ORDER BY created_at DESC',
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add goal
router.post('/', async (req, res) => {
  const { user_id, name, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO goals (user_id, name, status) VALUES ($1, $2, $3) RETURNING *',
      [user_id, name, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
