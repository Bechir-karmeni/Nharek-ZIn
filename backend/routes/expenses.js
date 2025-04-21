const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ GET all expenses for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM expenses
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching expenses:', err.message);
    res.status(500).json({ error: 'Failed to fetch expenses.' });
  }
});

// ✅ POST new expense
router.post('/', async (req, res) => {
  const { user_id, type, amount, description, category } = req.body;

  if (!user_id || !type || !amount) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO expenses (user_id, type, amount, description, category)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, type, amount, description || '', category || 'Uncategorized']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error adding expense:', err.message);
    res.status(500).json({ error: 'Failed to add expense.' });
  }
});

module.exports = router;
