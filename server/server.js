const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
try { require('dotenv').config(); } catch (e) { /* no dotenv */ }

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ Database Connection Error: ', err));
} else {
  console.log('⚠️ No MongoDB URI found in .env, running without database for now.');
}

// Routes
const teamRoutes = require('./routes/team');
const authRoutes = require('./routes/auth');
const mediaRoutes = require('./routes/media');
const taskRoutes = require('./routes/tasks');
const prRoutes = require('./routes/pr');
const adminRoutes = require('./routes/admin');

app.use('/api/team', teamRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/pr', prRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Velocity X API is running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
