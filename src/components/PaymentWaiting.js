import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = 'https://platformaspedytor8-back-production.up.railway.app';

const PaymentWaiting = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Przetwarzanie płatności...');
  const [pollingInterval, setPollingInterval] = useState(null);

  useEffect(() => {
    const transactionId = sessionStorage.getItem('tpayTransactionId');

    if (!transactionId) {
      // Brak transactionId → wracamy do koszyka
      navigate('/', { replace: true });
      return;
    }

    const pollStatus = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/tpay/check-status/${transactionId}`);
        const data = response.data;

        console.log('DEBUG: status transakcji Tpay:', data);

        // Sprawdzamy status
        if (data.status === 'paid' || data.status === 'correct') {
          clearInterval(pollingInterval); // zatrzymujemy polling
          navigate('/success', { replace: true });
        } else if (data.status === 'canceled' || data.status === 'failed') {
          clearInterval(pollingInterval);
          navigate('/cancel', { replace: true });
        }
        // w innych przypadkach kontynuujemy polling
      } catch (err) {
        console.error('Błąd przy sprawdzaniu statusu transakcji:', err);
        // Jeśli serwer zwraca błąd 400 → możemy przerwać polling i wrócić do koszyka
        if (err.response && err.response.status === 400) {
          clearInterval(pollingInterval);
          navigate('/', { replace: true });
        }
      }
    };

    // Polling co 5 sekund
    const intervalId = setInterval(pollStatus, 5000);
    setPollingInterval(intervalId);

    // Polling od razu przy wejściu
    pollStatus();

    return () => clearInterval(intervalId); // sprzątanie przy unmount
  }, [navigate, pollingInterval]);

  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h1>{message}</h1>
      <p>Nie zamykaj tej strony, trwa weryfikacja płatności...</p>
    </div>
  );
};

export default PaymentWaiting;
