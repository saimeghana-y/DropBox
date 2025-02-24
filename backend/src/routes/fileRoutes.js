const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadFile, getFiles, downloadFile, getFile, previewFile } = require('../controllers/fileController');
const authMiddleware = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// File routes that need authentication
router.get('/files', authMiddleware, getFiles);
router.post('/upload', authMiddleware, upload.single('file'), uploadFile);
router.get('/files/:id', authMiddleware, getFile);

// Public routes
router.get('/preview/:id', previewFile);
router.get('/download/:id', downloadFile);

module.exports = router; 