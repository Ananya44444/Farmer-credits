const Farmer = require('../models/farmer');
const jwt = require('jsonwebtoken');
const { generateOTP } = require('../utils/otpGenerator');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  try {
    const { name, phone, password, location } = req.body;

    const existingFarmer = await Farmer.findOne({ phone });
    if (existingFarmer) {
      return res.status(400).json({ 
        success: false, 
        message: 'Farmer with this phone number already exists' 
      });
    }

    const farmer = new Farmer({
      name,
      phone,
      password,
      location
    });

    const otp = generateOTP();
    farmer.otp = {
      code: otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    };

    await farmer.save();

    console.log(`OTP for ${phone}: ${otp}`);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify OTP.',
      data: { farmerId: farmer._id }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration',
      error: error.message 
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const farmer = await Farmer.findOne({ phone });
    if (!farmer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Farmer not found' 
      });
    }

    if (farmer.otp.code !== otp || farmer.otp.expiresAt < Date.now()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired OTP' 
      });
    }

    farmer.isVerified = true;
    farmer.otp = undefined;
    await farmer.save();

    const token = generateToken(farmer._id);

    res.json({
      success: true,
      message: 'OTP verified successfully',
      data: {
        token,
        farmer: {
          id: farmer._id,
          name: farmer.name,
          phone: farmer.phone,
          location: farmer.location
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error during OTP verification',
      error: error.message 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const farmer = await Farmer.findOne({ phone });
    if (!farmer) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid phone number or password' 
      });
    }

    const isPasswordValid = await farmer.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid phone number or password' 
      });
    }

    if (!farmer.isVerified) {
      const otp = generateOTP();
      farmer.otp = {
        code: otp,
        expiresAt: Date.now() + 10 * 60 * 1000
      };
      await farmer.save();

      console.log(`OTP for ${phone}: ${otp}`);

      return res.status(403).json({
        success: false,
        message: 'Account not verified. OTP sent to your phone.',
        data: { needsVerification: true }
      });
    }

    const token = generateToken(farmer._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        farmer: {
          id: farmer._id,
          name: farmer.name,
          phone: farmer.phone,
          location: farmer.location
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login',
      error: error.message 
    });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    const farmer = await Farmer.findOne({ phone });
    if (!farmer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Farmer not found' 
      });
    }

    const otp = generateOTP();
    farmer.otp = {
      code: otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    };
    await farmer.save();

    console.log(`New OTP for ${phone}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error while resending OTP',
      error: error.message 
    });
  }
};