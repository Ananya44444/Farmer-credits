const jwt = require('jsonwebtoken');
const Farmer = require('../models/farmer');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized to access this route' 
      });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await Farmer.findById(decoded.id);
      next();
    } catch (error) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized to access this route' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error during authentication',
      error: error.message 
    });
  }
};