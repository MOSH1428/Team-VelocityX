const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['To-Do', 'In Progress', 'Done'], default: 'To-Do' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  assignee: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
