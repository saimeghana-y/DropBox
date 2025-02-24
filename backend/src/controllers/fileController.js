const File = require('../models/File');
const path = require('path');
const fs = require('fs').promises;
const mongoose = require('mongoose');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'text/plain', 'application/json'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      await fs.unlink(req.file.path);
      return res.status(400).json({ message: 'File type not supported' });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);
    console.log('Uploading file for user:', userId);

    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      userId
    });

    const savedFile = await file.save();
    console.log('Saved file:', {
      id: savedFile._id,
      userId: savedFile.userId,
      originalName: savedFile.originalName
    });

    res.status(201).json(savedFile);
  } catch (error) {
    console.error('Error in uploadFile:', error);
    res.status(500).json({ message: error.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    console.log('Fetching files for user:', userId);
    
    const files = await File.find({ userId }).sort({ uploadDate: -1 });
    console.log('Found files:', files.length);
    console.log('Files:', files.map(f => ({ id: f._id, userId: f.userId })));
    
    res.json(files);
  } catch (error) {
    console.error('Error in getFiles:', error);
    res.status(500).json({ message: error.message });
  }
};

const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.download(file.path, file.originalName);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFile = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const file = await File.findOne({ 
      _id: req.params.id,
      userId
    });
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const previewFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // For images, send the file directly
    if (file.mimetype.startsWith('image/')) {
      const absolutePath = path.resolve(file.path);
      return res.sendFile(absolutePath);
    }

    // For text files, read and send the content
    if (file.mimetype === 'text/plain' || file.mimetype === 'application/json') {
      const content = await fs.readFile(file.path, 'utf-8');
      return res.send(content);
    }

    res.status(400).json({ message: 'Preview not available for this file type' });
  } catch (error) {
    console.error('Error in previewFile:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadFile,
  getFiles,
  downloadFile,
  getFile,
  previewFile
}; 