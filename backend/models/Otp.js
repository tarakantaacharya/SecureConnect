// models/Otp.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  otp: { 
    type: String, 
    required: true 
  },
  attempts: {
    type: Number,
    default: 0
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 600 // OTP expires after 10 minutes (600 seconds)
  }
});

module.exports = mongoose.model('Otp', otpSchema);