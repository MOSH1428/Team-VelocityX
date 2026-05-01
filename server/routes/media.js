const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../localDb'); // Using lowdb for fallback persistence

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// GET all media
router.get('/', (req, res) => {
  try {
    const media = db.get('media').value() || [];
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching media' });
  }
});

// POST upload new media
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, type, author, dept, date } = req.body;

    const newMedia = {
      id: Date.now().toString(),
      title: title || 'Untitled',
      type: type || 'image',
      author: author || 'Unknown',
      dept: dept || 'Media',
      date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      url: `/uploads/${file.filename}`
    };

    // Save to lowdb
    db.get('media').unshift(newMedia).write();

    res.status(201).json(newMedia);
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});

module.exports = router;
