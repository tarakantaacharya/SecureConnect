import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Calculate password strength when password field changes
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Extract email and password for authentication
    const { email, password } = formData;
    
    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    // Check password requirements
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
      // Register with all user data
      const res = await axios.post('http://localhost:8000/api/auth/register', formData);
      setSuccess(res.data.msg || "Registration successful!");
      
      // Store additional user data in localStorage for profile display
      localStorage.setItem('userData', JSON.stringify(formData));
      
      // Auto login after registration (only needs email and password)
      try {
        const loginRes = await axios.post('http://localhost:8000/api/auth/login', { email, password });
        localStorage.setItem('token', loginRes.data.token);
        
        // Redirect to profile page after a short delay
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      } catch (loginErr) {
        // If auto-login fails, redirect to login page
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.buttonContainer}>
        <Link to="/" className={styles.homeButton}>
          Back to Home
        </Link>
      </div>
      
      <form className={styles.registerForm} onSubmit={handleRegister}>
        <h2>Get Started</h2>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}
        
        <div className={styles.formGrid}>
          <input 
            className={styles.formInput}
            type="text" 
            name="name"
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Full Name" 
            required 
            disabled={loading || success}
          />
          
          <input 
            className={styles.formInput}
            type="email" 
            name="email"
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email Address" 
            required 
            disabled={loading || success}
          />
          <div className={styles.passwordContainer}>
            <input 
              className={`${styles.formInput} ${styles.passwordInput}`}
              type="password" 
              name="password"
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Create Password" 
              required 
              disabled={loading || success}
            />
            {formData.password && (
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
            )}
            <div className={styles.passwordNotice} style={{ marginTop: '10px' }}>
                Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
            </div>
          </div>
          <select
            className={styles.formSelect}
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            disabled={loading || success}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          
          <input 
            className={styles.formInput}
            type="number" 
            name="age"
            value={formData.age} 
            onChange={handleChange} 
            placeholder="Age" 
            min="1"
            max="120"
            required 
            disabled={loading || success}
          />
          
          <input 
            className={styles.formInput}
            type="text" 
            name="location"
            value={formData.location} 
            onChange={handleChange} 
            placeholder="Location" 
            required 
            disabled={loading || success}
          />
        </div>
        
        <button 
          className={styles.submitButton} 
          type="submit"
          disabled={loading || success}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        
        <div className={styles.linkContainer}>
          Already have an account? <Link className={styles.link} to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
