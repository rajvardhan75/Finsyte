const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route example
router.get('/me', auth, (req, res) => {
  res.json({ message: 'You are authorized', user: req.user });
});

module.exports = router;
