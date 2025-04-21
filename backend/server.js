const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./config/passport'); // 🔁 Import Google OAuth strategy (if still used)

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====

// ✅ Allow frontend requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // This must match your frontend's port!
  credentials: true
}));

app.use(express.json());

// ✅ Setup session (needed for Passport and secure logins)
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false
}));

// ✅ Init Passport.js (if you're using Google login or sessions)
app.use(passport.initialize());
app.use(passport.session());

// ===== ROUTES =====
const authRoutes = require('./routes/auth'); // ← classic login/signup
const taskRoutes = require('./routes/tasks');
const noteRoutes = require('./routes/notes');
const waterRoutes = require('./routes/water');
const moodRoutes = require('./routes/moods');
const contactRoutes = require('./routes/contacts');
const goalRoutes = require('./routes/goals');
const expenseRoutes = require('./routes/expenses');
// const googleAuthRoutes = require('./routes/authGoogle'); // ❌ remove if not using Google

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/expenses', expenseRoutes);
// app.use('/auth/google', googleAuthRoutes); // ❌ optional, comment out if removed

// ===== DEFAULT ROUTE =====
app.get('/', (req, res) => {
  res.send('Nhare Zin API is running 🚀');
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
