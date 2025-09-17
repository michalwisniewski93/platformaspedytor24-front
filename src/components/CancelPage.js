import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CancelPage = () => {
  useEffect(() => {
    // Sprzątanie stanu płatności
    sessionStorage.removeItem('paymentStarted');
    // Nie usuwamy orderData, jeśli chcemy umożliwić wznowienie
    // sessionStorage.removeItem('orderData');
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Płatność została anulowana</h1>
      <p>Możesz wrócić do koszyka i spróbować ponownie.</p>
      <Link to="/">Wróć na stronę główną</Link>
    </div>
  );
};

export default CancelPage;

