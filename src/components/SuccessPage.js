import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

  function getFormattedDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const months = [
      'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
      'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get('transactionId') || sessionStorage.getItem('tpayTransactionId');

    if (!transactionId) {
      navigate('/', { replace: true });
      return;
    }

    // 1️⃣ Sprawdzenie statusu transakcji w backendzie
    axios.get(`${BACKEND_URL}/tpay/check-status/${transactionId}`)
      .then(async (res) => {
        const data = res.data;
        if (data.status !== 'paid' && data.status !== 'correct') {
          // Płatność nieudana → redirect
          navigate('/', { replace: true });
          return;
        }

        // 2️⃣ Pobranie danych zamówienia z sessionStorage
        const orderData = JSON.parse(sessionStorage.getItem('orderData'));
        if (!orderData) {
          console.error('Brak danych zamówienia w sessionStorage');
          navigate('/', { replace: true });
          return;
        }

        try {
          // 3️⃣ Dodanie zamówienia w backendzie
          await axios.post(`${BACKEND_URL}/orders`, orderData);

          // 4️⃣ Pobranie taxdatas i numeru faktury
          const taxdatasRes = await axios.get(`${BACKEND_URL}/taxdatas`);
          const taxdatas = taxdatasRes.data[0];
          const currentDate = new Date();
          const formattedDate = getFormattedDate();
          const invoiceNumber = `FV ${taxdatas.invoicesactualnumber}/${String(currentDate.getMonth()+1).padStart(2,'0')}/${currentDate.getFullYear()}`;

          // 5️⃣ Zwiększenie numeru faktury
          await axios.put(`${BACKEND_URL}/taxdatas/${taxdatas._id}`, {
            invoicesactualnumber: taxdatas.invoicesactualnumber + 1
          });

          // 6️⃣ Wystawienie faktury
          await axios.post(`${BACKEND_URL}/invoices`, {
            invoicenumber: invoiceNumber,
            invoicedateofissue: formattedDate,
            dateofsale: formattedDate,
            sellercompanyname: taxdatas.sellercompanyname,
            sellercompanystreet: taxdatas.sellercompanystreet,
            sellercompanypostcode: taxdatas.sellercompanypostcode,
            sellercompanycity: taxdatas.sellercompanycity,
            sellercompanynip: taxdatas.sellercompanynip,
            sellercompanyregon: taxdatas.sellercompanyregon,
            customername: orderData.name,
            customersurname: orderData.surname,
            customerstreet: orderData.street,
            customerpostcode: orderData.postcode,
            customercity: orderData.city,
            customercompanyname: orderData.companyname,
            customercompanystreet: orderData.companystreet,
            customercompanypostcode: orderData.companypostcode,
            customercompanycity: orderData.companycity,
            customerinvoice: orderData.invoice,
            customercompanynip: orderData.companynip,
            customercompanyregon: orderData.companyregon,
            ordercontent: orderData.ordercontent,
            orderamount: orderData.orderamount,
            basisforvatexemption: taxdatas.basisforvatexemption,
            paymentterm: formattedDate,
            ordertime: formattedDate,
            login: orderData.login
          });

          // 7️⃣ Aktualizacja dostępów użytkownika
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

          // 8️⃣ Sprzątanie danych tymczasowych
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

  if (loading) return <h1>Przetwarzanie płatności...</h1>;

  return <h1>🎉 Płatność zakończona sukcesem! Dostęp do kursów został przyznany.</h1>;
};

export default SuccessPage;
