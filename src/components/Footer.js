import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css'
import CookieConsent from './CookieConsent'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.sectionLeft}>
          <Link to="/regulamin" style={styles.link}>Regulamin</Link>
          <Link to="/polityka-prywatnosci" style={styles.link}>Polityka prywatności</Link>
          <Link to="/admin" style={styles.link}>Panel administracyjny</Link>
        </div>

        <div style={styles.sectionCenter}>
          &copy; {currentYear} spedytorszkolenia.pl
        </div>

        <div style={styles.sectionRight}>
          <a href="https://www.facebook.com/profile.php?id=61578173259896" target="_blank" rel="noopener noreferrer" style={styles.fbLink}>
            <i className="fab fa-facebook-f" style={styles.fbIcon}></i>
          </a>
        </div>
      </div>
      <CookieConsent/>
    </footer>
  );
};

const styles = {
  footer: {
    width: '100%',
    backgroundColor: '#111',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    padding: '1.5rem 1rem',
    marginTop: '30px',
    
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    // Media query via JS (CSS-in-JS way)
    // Will be overwritten with media query in effect (handled later)
  },
  sectionLeft: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  sectionCenter: {
    marginBottom: '1rem',
    textAlign: 'center',
  },
  sectionRight: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
  fbLink: {
    backgroundColor: '#3b5998',
    borderRadius: '50%',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    width: '2rem',
    height: '2rem',
    textDecoration: 'none',
  },
  fbIcon: {
    fontSize: '1rem',
  },
};

// CSS media query override using styled-components or external CSS is better,
// but if you're using inline styles, you should move this to a CSS file for responsiveness.
// Below is an optional suggestion.

export default Footer;
