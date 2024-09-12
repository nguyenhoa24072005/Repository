const express = require('express');
const { auth } = require('./firebase');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Đăng ký người dùng
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await auth.createUser({ email, password });
    const token = jwt.sign({ uid: userRecord.uid, role: 'user' }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Đăng nhập người dùng
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await auth.getUserByEmail(email);
    const token = jwt.sign({ uid: user.uid, role: 'user' }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
