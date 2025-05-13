import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setSuccess(res.data.msg || "Login successful!");
      
      // Redirect to profile page after a short delay
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please check your credentials.");
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
      
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2>Welcome Back</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}
        
        <input 
          className={styles.formInput}
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email Address" 
          required 
          disabled={loading}
        />
        
        <input 
          className={styles.formInput}
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
          disabled={loading}
        />
        
        <button 
          className={styles.submitButton} 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        
        <div className={styles.linkContainer}>
          <Link className={styles.link} to="/forgot-password">Forgot Password?</Link>
        </div>

        <div className={styles.linkContainer}>
          Don't have an account? <Link className={styles.link} to="/register">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
