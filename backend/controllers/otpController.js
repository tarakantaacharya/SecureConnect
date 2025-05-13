const nodemailer = require('nodemailer');
const { generateOTP } = require('../utils/Otp');
const Otp = require('../models/Otp');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Send OTP for password reset
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No account found with this email address' });
    }

    const otp = generateOTP();

    // Save OTP to database with expiry
    await Otp.findOneAndDelete({ email }); // Delete any existing OTP
    await Otp.create({ email, otp });
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP code for password reset is ${otp}. This code will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You requested a password reset for your account.</p>
          <p>Your OTP code is: <strong style="font-size: 24px; color: #4285f4;">${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email or contact support if you have concerns.</p>
        </div>
      `
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const MAX_ATTEMPTS = 5; // Maximum number of verification attempts
  
  try {
    const otpRecord = await Otp.findOne({ email });
    
    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP expired or not found' });
    }
    
    // Check if max attempts reached
    if (otpRecord.attempts >= MAX_ATTEMPTS) {
      // Delete the OTP record to force the user to request a new one
      await Otp.findOneAndDelete({ email });
      return res.status(400).json({ message: 'Too many failed attempts. Please request a new OTP.' });
    }
    
    // Check if OTP matches
    if (otpRecord.otp !== otp) {
      // Increment attempts
      otpRecord.attempts += 1;
      await otpRecord.save();
      
      const remainingAttempts = MAX_ATTEMPTS - otpRecord.attempts;
      return res.status(400).json({ 
        message: `Invalid OTP. ${remainingAttempts} attempts remaining.` 
      });
    }
    
    // OTP is valid
    res.json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error('Error verifying OTP:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  
  try {
    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Update user's password
    user.password = hashedPassword;
    await user.save();
    
    // Delete the OTP record
    await Otp.findOneAndDelete({ email });
    
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
