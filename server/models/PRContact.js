const mongoose = require('mongoose');

const PRContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  department: { type: String },
  email: { type: String },
  phone: { type: String },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PRContact', PRContactSchema);
