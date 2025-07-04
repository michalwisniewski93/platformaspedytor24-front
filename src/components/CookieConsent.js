import React, { useState, useEffect } from 'react';
import '../styles/cookies.css'; // opcjonalnie, stylizacja

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
    // tutaj możesz uruchomić np. Google Analytics
   
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        🍪 Używamy plików cookie w celach technicznych, analitycznych i marketingowych. 
        Kontynuując korzystanie z serwisu, akceptujesz naszą politykę prywatności. 
        Więcej informacji znajdziesz w <a href="/polityka-prywatnosci" target="_blank">polityce prywatności</a>.
      </p>
      <div className="cookie-buttons">
        <button onClick={handleAccept}>Akceptuję</button>
        <button onClick={handleReject}>Odrzucam</button>
      </div>
    </div>
  );
};

export default CookieConsent;
