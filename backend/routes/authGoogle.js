const express = require('express');
const passport = require('passport');
const router = express.Router();

// Redirige l’utilisateur vers Google pour l'auth
router.get('/', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Callback après authentification réussie
router.get('/callback', passport.authenticate('google', {
  failureRedirect: '/login.html'
}), (req, res) => {
  // Stocker l'utilisateur connecté dans la session ou JWT ici
  res.redirect('http://localhost:5500/public/monthly.html?google=true');
});

module.exports = router;
