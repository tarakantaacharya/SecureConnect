const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, resetPassword } = require('../controllers/otpController');

// Send OTP for password reset
router.post('/send-otp', sendOtp);

// Verify OTP
router.post('/verify-otp', verifyOtp);

// Reset password
router.post('/reset-password', resetPassword);

module.exports = router;
