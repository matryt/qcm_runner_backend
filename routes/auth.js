const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('dotenv').config();

router.post('/login', (req, res) => {
  if (!process.env.PASSWORD) {
    res.status(500).json({ message: 'Server error' });
    return;
  }
  const { password } = req.body;
  if (password === process.env.PASSWORD) {
    const token = jwt.sign({ 'type': 'server' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
