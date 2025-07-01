import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');

    if (!sessionId) {
      navigate('/', { replace: true });
      return;
    }

    fetch(`http://localhost:5000/check-payment-status?sessionId=${sessionId}`)
      .then(res => res.json())
      .then(async data => {
        if (data.paid) {
          sessionStorage.setItem('paymentStarted', 'true');

          // Pobierz dane tymczasowe zamówienia z sessionStorage
          const orderData = JSON.parse(sessionStorage.getItem('orderData'));
          if (!orderData) {
            console.error("Brak danych zamówienia w sessionStorage");
            navigate('/', { replace: true });
            return;
          }

          // Dodaj zamówienie do bazy
          try {
            await axios.post('http://localhost:5000/orders', orderData);
          } catch (error) {
            console.error("Błąd dodawania zamówienia do bazy:", error);
            // Możesz przekierować lub pokazać błąd użytkownikowi
          }

          // Pobierz klientów, aby zaktualizować dostęp do kursów
          axios.get('http://localhost:5000/customers')
            .then(response => setCustomers(response.data))
            .catch(() => navigate('/', { replace: true }));
        } else {
          navigate('/', { replace: true });
        }
      })
      .catch(() => navigate('/', { replace: true }));
  }, [location, navigate]);

  useEffect(() => {
    const paymentStarted = sessionStorage.getItem('paymentStarted');

    if (!paymentStarted) {
      navigate('/', { replace: true });
      return;
    }

    if (customers.length === 0) return; // Czekaj na dane klientów

    const foundUser = getCookie('user');
    if (!foundUser) {
      navigate('/', { replace: true });
      return;
    }

    const login = foundUser.split(';')[0];
    const myUser = customers.find(customer => customer.login === login);

    if (!myUser) {
      console.warn('Nie znaleziono użytkownika o loginie:', login);
      navigate('/', { replace: true });
      return;
    }

    const oldAccesses = myUser.accesses || '';
    const editingId = myUser._id;
    const newAccesses = getCookie('newaccesses') || '';

    const finalAccesses = oldAccesses + (oldAccesses ? ';' : '') + newAccesses;

    axios.put(`http://localhost:5000/customers/${editingId}`, { accesses: finalAccesses })
      .then(() => {
        deleteCookie('newaccesses');
        sessionStorage.removeItem('paymentStarted');
        sessionStorage.removeItem('orderData');
      })
      .catch(err => console.error("Error updating customer accesses:", err));

  }, [customers, navigate]);

  return <h1>Przetwarzanie płatności...</h1>;
};

export default SuccessPage;
