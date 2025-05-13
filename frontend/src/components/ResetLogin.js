import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './ResetLogin.module.css';

const ResetLogin = ({ email }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 1;
    
    return strength;
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    // Check password strength
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/otp/reset-password', {
        email,
        password,
        confirmPassword
      });
      
      setSuccess(response.data.message);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Reset Password</h2>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className={styles.disabledInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                const newPassword = e.target.value;
                setPassword(newPassword);
                setPasswordStrength(calculatePasswordStrength(newPassword));
              }}
              required
              placeholder="Enter new password"
            />
            <div className={styles.passwordStrength}>
              <div className={styles.strengthBar}>
                <div 
                  className={styles.strengthFill} 
                  style={{ 
                    width: `${(passwordStrength / 5) * 100}%`,
                    backgroundColor: 
                      passwordStrength === 0 ? '#e0e0e0' :
                      passwordStrength <= 2 ? '#f44336' :
                      passwordStrength <= 3 ? '#ff9800' :
                      passwordStrength <= 4 ? '#2196f3' : '#4caf50'
                  }}
                ></div>
              </div>
              <div className={styles.strengthText}>
                {passwordStrength === 0 && 'Enter password'}
                {passwordStrength === 1 && 'Very weak'}
                {passwordStrength === 2 && 'Weak'}
                {passwordStrength === 3 && 'Medium'}
                {passwordStrength === 4 && 'Strong'}
                {passwordStrength === 5 && 'Very strong'}
              </div>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.button}
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        
        <div className={styles.links}>
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetLogin;