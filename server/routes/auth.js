const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Member = require('../models/Member');
const db = require('../localDb');

const JWT_SECRET = process.env.JWT_SECRET || 'velocity_secret_key_2024';
const isMongo = () => mongoose.connection.readyState === 1;

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, idNumber, role, department } = req.body;

    if (isMongo()) {
      const existing = await Member.findOne({ email });
      if (existing) return res.status(400).json({ message: 'Email already exists' });
      
      const newMember = new Member({ name, email, password, idNumber, role, department });
      await newMember.save();
      return res.status(201).json({ message: 'User registered' });
    }

    // Lowdb logic
    const members = db.get('members').value() || [];
    if (members.find(m => m.email === email)) {
      return res.status(400).json({ message: 'Email already exists locally' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newMember = {
      id: Date.now().toString(),
      name, email, idNumber, role, department,
      password: hashedPassword,
      isAdmin: false
    };

    db.get('members').push(newMember).write();
    res.status(201).json({ message: 'User registered locally' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let member;

    if (isMongo()) {
      member = await Member.findOne({ email });
    } else {
      member = db.get('members').find({ email }).value();
    }

    if (!member) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: member.id || member._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      token, 
      member: { 
        id: member.id || member._id, 
        name: member.name, 
        role: member.role,
        isAdmin: member.isAdmin || false
      } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
