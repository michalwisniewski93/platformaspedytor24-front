import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // <- dodany Link
import axios from 'axios';

const BACKEND_URL = 'https://platformaspedytor8-back-production.up.railway.app';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get('transactionId') || sessionStorage.getItem('tpayTransactionId');

    if (!transactionId) {
      navigate('/', { replace: true });
      return;
    }

    axios.get(`${BACKEND_URL}/tpay/check-status/${transactionId}`)
      .then(async (res) => {
        const data = res.data;
        if (data.status !== 'pending' && data.status !== 'correct') {
          navigate('/', { replace: true });
          return;
        }

        const orderData = JSON.parse(sessionStorage.getItem('orderData'));
        if (!orderData) {
          console.error('Brak danych zamówienia w sessionStorage');
          navigate('/', { replace: true });
          return;
        }

        try {
          await axios.post(`${BACKEND_URL}/orders`, orderData);

          const customersRes = await axios.get(`${BACKEND_URL}/customers`);
          const foundUser = getCookie('user')?.split(';')[0];
          if (!foundUser) {
            navigate('/', { replace: true });
            return;
          }

          const myUser = customersRes.data.find(c => c.login === foundUser);
          if (!myUser) {
            navigate('/', { replace: true });
            return;
          }

          const newAccesses = getCookie('newaccesses') || '';
          const finalAccesses = myUser.accesses ? `${myUser.accesses};${newAccesses}` : newAccesses;

          await axios.put(`${BACKEND_URL}/customers/${myUser._id}`, { accesses: finalAccesses });

          deleteCookie('newaccesses');
          sessionStorage.removeItem('paymentStarted');
          sessionStorage.removeItem('orderData');
          sessionStorage.removeItem('tpayTransactionId');

          setLoading(false);
        } catch (err) {
          console.error('Błąd przy przetwarzaniu sukcesu:', err);
          navigate('/', { replace: true });
        }
      })
      .catch(() => navigate('/', { replace: true }));
  }, [location, navigate]);

  if (loading) return <h1 style={{ fontFamily: 'Verdana, sans-serif' }}>Przetwarzanie płatności...</h1>;

  return (
    <div className="greatSuccess">
      <h1>🎉 Płatność zakończona sukcesem! Dostęp do kursów został przyznany.</h1>
      <p>
        <Link to="/moje-kursy">Przejdź do Moje kursy</Link>
      </p>
    </div>
  ); 
};

export default SuccessPage;
