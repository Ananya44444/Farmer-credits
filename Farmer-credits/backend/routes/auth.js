const express = require('express');
const { 
  register, 
  verifyOTP, 
  login, 
  resendOTP 
} = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validation');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  return register(req, res, next);
});

router.post('/verify-otp', verifyOTP);

router.post('/login', async (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  return login(req, res, next);
});

router.post('/resend-otp', resendOTP);

module.exports = router;