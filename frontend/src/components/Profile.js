import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Profile.module.css';

function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
    location: '',
    joinDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Get user data from localStorage first (from registration)
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData({
          ...parsedData,
          joinDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        });
        setLoading(false);
        return; // Skip API call if we have data
      } catch (e) {
        // If parsing fails, continue to API call
        console.log('Error parsing stored user data');
      }
    }

    // If no stored data, try to fetch from API
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // This is a fallback - we'll use email from API response
        const response = await axios.get('http://localhost:8000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // If we only get email from API, create a minimal profile
        setUserData({
          name: response.data.name || 'User',
          email: response.data.email,
          gender: response.data.gender || 'Not specified',
          age: response.data.age || 'Not specified',
          location: response.data.location || 'Not specified',
          joinDate: new Date(response.data.createdAt || Date.now()).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data. Please try again later.');
        setLoading(false);
        // If token is invalid or expired, redirect to login
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Get first letter of email for avatar
  const getInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : '?';
  };

  if (loading) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.emptyState}>
          <h2>Loading profile...</h2>
          <p>Please wait while we fetch your information.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.emptyState}>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.logoutCorner}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
      
      <div className={styles.profileContainer}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            {getInitial(userData.name || userData.email)}
          </div>
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{userData.name || 'Welcome'}</h2>
            <p className={styles.userEmail}>{userData.email}</p>
            <p className={styles.joinDate}>Member since {userData.joinDate}</p>
          </div>
        </div>

        <div className={styles.userDetailsContainer}>
          <h3 className={styles.sectionTitle}>Personal Information</h3>
          <div className={styles.userDetailsGrid}>
            <div className={styles.detailCard}>
              <span className={styles.detailLabel}>Gender</span>
              <span className={styles.detailValue}>{userData.gender || 'Not specified'}</span>
            </div>
            <div className={styles.detailCard}>
              <span className={styles.detailLabel}>Age</span>
              <span className={styles.detailValue}>{userData.age || 'Not specified'}</span>
            </div>
            <div className={styles.detailCard}>
              <span className={styles.detailLabel}>Location</span>
              <span className={styles.detailValue}>{userData.location || 'Not specified'}</span>
            </div>
          </div>
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <p className={styles.statValue}>0</p>
            <p className={styles.statLabel}>Projects</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statValue}>0</p>
            <p className={styles.statLabel}>Tasks</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statValue}>0</p>
            <p className={styles.statLabel}>Completed</p>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Link to="/" className={styles.homeButton}>
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default Profile;