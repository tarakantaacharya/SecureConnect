import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './EmailVerification.module.css';
import ResetLogin from './ResetLogin';

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/otp/send-otp', { email });
      setMessage(response.data.message);
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/otp/verify-otp', { email, otp });
      setMessage(response.data.message);
      setOtpVerified(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  if (otpVerified) {
    return <ResetLogin email={email} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Password Reset</h2>
        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.success}>{message}</div>}

        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <button 
              type="submit" 
              className={styles.button} 
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className={styles.formGroup}>
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter the OTP sent to your email"
              />
            </div>
            <button 
              type="submit" 
              className={styles.button} 
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button 
              type="button" 
              className={styles.secondaryButton}
              onClick={() => setOtpSent(false)}
              disabled={loading}
            >
              Back to Email
            </button>
          </form>
        )}
        <div className={styles.links}>
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;