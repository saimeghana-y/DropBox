const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    
    // Ensure the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      console.log('Invalid ObjectId:', decoded.id);
      return res.status(401).json({ message: 'Invalid user ID' });
    }

    req.user = { id: decoded.id };
    console.log('User ID set in request:', req.user.id);
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware; 