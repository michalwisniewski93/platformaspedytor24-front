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

    fetch(`https://platformaspedytor8-back.vercel.app/check-payment-status?sessionId=${sessionId}`)
      .then(res => res.json())
      .then(async data => {
        if (data.paid) {
          sessionStorage.setItem('paymentStarted', 'true');

          const orderData = JSON.parse(sessionStorage.getItem('orderData'));
          if (!orderData) {
            console.error("Brak danych zamówienia w sessionStorage");
            navigate('/', { replace: true });
            return;
          }

          try {
            // 1. Dodanie zamówienia
            await axios.post('https://platformaspedytor8-back.vercel.app/orders', orderData);

            // 2. Pobranie taxdatas
            const taxdatasRes = await axios.get('https://platformaspedytor8-back.vercel.app/taxdatas');
            const taxdatas = taxdatasRes.data[0]; // zakładamy jeden wpis

            const currentDate = new Date();
            const formattedDate = getFormattedDate();
            const invoiceNumber = "FV " + taxdatas.invoicesactualnumber + '/' +
              String(currentDate.getMonth() + 1).padStart(2, '0') + '/' +
              currentDate.getFullYear();

            // 3. Zwiększenie numeru faktury
            await axios.put("https://platformaspedytor8-back.vercel.app/taxdatas/6867cecac69b1bd9988c38d8", {
              invoicesactualnumber: taxdatas.invoicesactualnumber + 1
            });

            // 4. Wystawienie faktury
            await axios.post("https://platformaspedytor8-back.vercel.app/invoices", {
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

          } catch (error) {
            console.error("Błąd podczas przetwarzania faktury:", error);
          }

          // 5. Pobranie klientów do aktualizacji dostępów
          axios.get('https://platformaspedytor8-back.vercel.app/customers')
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

    if (customers.length === 0) return;

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

    axios.put(`https://platformaspedytor8-back.vercel.app/customers/${editingId}`, { accesses: finalAccesses })
      .then(() => {
        deleteCookie('newaccesses');
        sessionStorage.removeItem('paymentStarted');
        sessionStorage.removeItem('orderData');
      })
      .catch(err => console.error("Error updating customer accesses:", err));
  }, [customers, navigate]);

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

  return <h1>Przetwarzanie płatności...</h1>;
};

export default SuccessPage;
