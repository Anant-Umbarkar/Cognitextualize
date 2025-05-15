import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../Model/User.js';

const router = express.Router();

const JWT_SECRET = 'Cognitextualize@123';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate token with no expiry
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Signin Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
