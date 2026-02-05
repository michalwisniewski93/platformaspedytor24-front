import React from 'react';
import '../styles/style.css'; // import stylów
import contactus from '../images/contactus.png';

const HeroContact = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.overlay}></div>
      <div style={styles.text}>
        <p>
          Masz pytania ? <br />
          Skontaktuj się ze mną: <br />
          <strong>spedytorszkolenia@gmail.com</strong>
        </p>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    maxWidth: '1940px',
    margin: '20px auto',
    position: 'relative',
    width: '100vw',
    height: '30vh',
    backgroundImage: `url(${contactus})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
    textAlign: 'center',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(102, 102, 214, 0.4)', // półprzezroczysty kolor
    backdropFilter: 'blur(8px)', // efekt szyby
    WebkitBackdropFilter: 'blur(8px)', // dla Safari
    zIndex: 1,
  },
  text: {
    position: 'relative',
    zIndex: 2,
    fontSize: '20px',
    padding: '0 1rem',
  }
};

export default HeroContact;


