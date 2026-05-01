const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/Task');
const db = require('../localDb');

// Check if MongoDB is connected
const isMongo = () => mongoose.connection.readyState === 1;

// GET all tasks
router.get('/', async (req, res) => {
  try {
    if (isMongo()) {
      const tasks = await Task.find().sort({ createdAt: -1 });
      return res.json(tasks);
    }
    // Fallback to lowdb
    const tasks = db.get('tasks').value() || [];
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new task
router.post('/', async (req, res) => {
  try {
    if (isMongo()) {
      const newTask = new Task(req.body);
      const savedTask = await newTask.save();
      return res.status(201).json(savedTask);
    }
    // Fallback to lowdb
    const newTask = { id: Date.now().toString(), ...req.body, createdAt: new Date() };
    db.get('tasks').push(newTask).write();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE task status
router.put('/:id', async (req, res) => {
  try {
    if (isMongo()) {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(updatedTask);
    }
    // Fallback to lowdb
    db.get('tasks').find({ id: req.params.id }).assign(req.body).write();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    if (isMongo()) {
      await Task.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Task deleted' });
    }
    // Fallback to lowdb
    db.get('tasks').remove({ id: req.params.id }).write();
    res.json({ message: 'Task deleted from local db' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
