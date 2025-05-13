// utils/Otp.js
const crypto = require('crypto');

// Generate a secure 6-digit OTP using crypto
exports.generateOTP = () => {
  // Generate a random buffer and convert to a number
  const buffer = crypto.randomBytes(3); // 3 bytes = 24 bits
  const value = buffer.readUIntBE(0, 3); // Read as unsigned integer
  
  // Ensure it's 6 digits by taking modulo and adding offset if needed
  const otp = (value % 900000 + 100000).toString();
  return otp;
};

exports.generateOTPToken = () => {
  return crypto.randomBytes(20).toString('hex');
};
