const express = require('express');
const router = express.Router();
const pool = require('../db');

// Save or update mood
router.post('/', async (req, res) => {
  const { user_id, mood } = req.body;
  const today = new Date().toISOString().slice(0, 10);

  try {
    const existing = await pool.query(
      'SELECT id FROM moods WHERE user_id = $1 AND mood_date = $2',
      [user_id, today]
    );

    if (existing.rows.length > 0) {
      // Update existing mood
      const updated = await pool.query(
        'UPDATE moods SET mood = $1 WHERE user_id = $2 AND mood_date = $3 RETURNING *',
        [mood, user_id, today]
      );
      return res.status(200).json(updated.rows[0]);
    }

    // Insert new mood
    const inserted = await pool.query(
      'INSERT INTO moods (user_id, mood, mood_date) VALUES ($1, $2, $3) RETURNING *',
      [user_id, mood, today]
    );
    res.status(201).json(inserted.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get today's mood for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const today = new Date().toISOString().slice(0, 10);

  try {
    const result = await pool.query(
      'SELECT mood FROM moods WHERE user_id = $1 AND mood_date = $2',
      [userId, today]
    );

    res.status(200).json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
