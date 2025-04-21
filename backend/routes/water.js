const express = require('express');
const router = express.Router();
const pool = require('../db');

// Add water entry
router.post('/', async (req, res) => {
  const { user_id, amount } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO water (user_id, amount) VALUES ($1, $2) RETURNING *',
      [user_id, amount]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get today's total water intake for a user
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) AS total FROM water 
       WHERE user_id = $1 AND DATE(entry_time) = CURRENT_DATE`,
      [userId]
    );
    res.json({ total: result.rows[0].total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
