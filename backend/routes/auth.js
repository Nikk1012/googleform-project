const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        data: null, 
        message: 'Please provide all fields' 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        data: null, 
        message: 'User already exists' 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword 
    });

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      success: true, 
      data: { token, name: user.name, email: user.email }, 
      message: 'User registered successfully' 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      data: null, 
      message: error.message 
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        data: null, 
        message: 'Please provide email and password' 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        data: null, 
        message: 'Invalid credentials' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        data: null, 
        message: 'Invalid credentials' 
      });
    }

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({ 
      success: true, 
      data: { token, name: user.name, email: user.email }, 
      message: 'Login successful' 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      data: null, 
      message: error.message 
    });
  }
});

module.exports = router;