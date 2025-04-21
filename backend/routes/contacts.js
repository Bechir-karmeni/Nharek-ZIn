const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all contacts
router.get('/:userId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contacts WHERE user_id = $1 ORDER BY created_at DESC',
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new contact
router.post('/', async (req, res) => {
  const { user_id, name, email, phone, label } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contacts (user_id, name, email, phone, label) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, name, email, phone, label]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
