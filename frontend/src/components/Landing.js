import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

function Landing() {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Welcome to Secure Connect</h1>
        <p className={styles.heroSubtitle}>
          Your secure platform for connecting and collaborating with others
        </p>
        
        <div className={styles.buttonGroup}>
          <Link to="/login" className={styles.loginButton}>
            Sign In
          </Link>
          <Link to="/register" className={styles.registerButton}>
            Create Account
          </Link>
        </div>
      </div>
      
      <div className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
        
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3 className={styles.featureTitle}>Secure</h3>
            <p className={styles.featureDescription}>
              Your data is encrypted and protected with the latest security measures
            </p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3 className={styles.featureTitle}>Fast</h3>
            <p className={styles.featureDescription}>
              Optimized performance for a smooth and responsive experience
            </p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌐</div>
            <h3 className={styles.featureTitle}>Connected</h3>
            <p className={styles.featureDescription}>
              Stay connected with your team from anywhere in the world
            </p>
          </div>
        </div>
      </div>
      
      <footer className={styles.footer}>
        <p>© 2025 Secure Connect. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;