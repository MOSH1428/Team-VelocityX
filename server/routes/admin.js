const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Member = require('../models/Member');
const db = require('../localDb');

const isMongo = () => mongoose.connection.readyState === 1;

// GET all users for management
router.get('/members', async (req, res) => {
  try {
    if (isMongo()) {
      const members = await Member.find({}, '-password');
      return res.json(members);
    }
    const members = db.get('members').value() || [];
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members' });
  }
});

// UPDATE user
router.put('/members/:id', async (req, res) => {
  try {
    if (isMongo()) {
      await Member.findByIdAndUpdate(req.params.id, req.body);
      return res.json({ success: true });
    }
    db.get('members').find({ id: req.params.id }).assign(req.body).write();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error updating member' });
  }
});

// DELETE user
router.delete('/members/:id', async (req, res) => {
  try {
    if (isMongo()) {
      await Member.findByIdAndDelete(req.params.id);
      return res.json({ success: true });
    }
    db.get('members').remove({ id: req.params.id }).write();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member' });
  }
});

module.exports = router;
