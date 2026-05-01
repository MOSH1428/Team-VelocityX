const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Member = require('../models/Member');
const db = require('../localDb');

const isMongo = () => mongoose.connection.readyState === 1;

// GET all members
router.get('/', async (req, res) => {
  try {
    if (isMongo()) {
      const members = await Member.find({}, '-password');
      return res.json(members);
    }
    const members = db.get('members').value() || [];
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
