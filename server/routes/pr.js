const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PRContact = require('../models/PRContact');
const db = require('../localDb');

const isMongo = () => mongoose.connection.readyState === 1;

router.get('/', async (req, res) => {
  try {
    if (isMongo()) {
      const contacts = await PRContact.find().sort({ createdAt: -1 });
      return res.json(contacts);
    }
    const contacts = db.get('prContacts').value() || [];
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    if (isMongo()) {
      const newContact = new PRContact(req.body);
      const saved = await newContact.save();
      return res.status(201).json(saved);
    }
    const newContact = { id: Date.now().toString(), ...req.body, createdAt: new Date() };
    db.get('prContacts').push(newContact).write();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (isMongo()) {
      const updated = await PRContact.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(updated);
    }
    db.get('prContacts').find({ id: req.params.id }).assign(req.body).write();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (isMongo()) {
      await PRContact.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Deleted' });
    }
    db.get('prContacts').remove({ id: req.params.id }).write();
    res.json({ message: 'Deleted locally' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
