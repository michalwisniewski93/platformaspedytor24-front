import React, { useEffect, useState } from 'react';
import '../styles/basket.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = 'https://platformaspedytor8-back-production.up.railway.app';

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Dane użytkownika
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [street, setStreet] = useState('');
  const [postcode, setPostCode] = useState('');
  const [city, setCity] = useState('');
  const [companyname, setCompanyName] = useState('');
  const [companystreet, setCompanyStreet] = useState('');
  const [companypostcode, setCompanyPostCode] = useState('');
  const [companycity, setCompanyCity] = useState('');
  const [email, setEmail] = useState('');
  const [invoice, setInvoice] = useState(false);
  const [login, setLogin] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [password, setPassword] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [regulations, setRegulations] = useState(false);
  const [companynip, setCompanyNip] = useState(0);
  const [companyregon, setCompanyRegon] = useState(0);

  const [acceptregulations, setAcceptRegulations] = useState(false);
  const [acceptregulationsinfo, setAcceptRegulationsInfo] = useState('');

  const navigate = useNavigate();

  // Placeholder dla accesses i setCookie
  const accesses = [];
  function setCookie(name, value, days) {
    if (typeof document !== 'undefined') {
      const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires};path=/`;
    }
  }

  // Pobranie koszyka z localStorage (tylko po stronie klienta)
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const storedBasket = localStorage.getItem('basket');
      if (storedBasket) {
        try {
          const parsedBasket = JSON.parse(storedBasket);
          setBasket(parsedBasket);
        } catch (error) {
          console.error('Błąd parsowania basket z localStorage:', error);
          setBasket([]);
        }
      }
    }
  }, []);

  // Pobranie klientów i uzupełnienie danych zalogowanego użytkownika
  useEffect(() => {
    axios.get(`${BACKEND_URL}/customers`)
      .then((response) => {
        setCustomers(response.data);
        const userCookie = getCookie('user');
        if (userCookie) {
          const loginValue = userCookie.split(';')[0];
          const myUser = response.data.find(customer => customer.login === loginValue);
          if (myUser) {
            setName(myUser.name);
            setSurname(myUser.surname);
            setStreet(myUser.street);
            setPostCode(myUser.postcode);
            setCity(myUser.city);
            setCompanyName(myUser.companyname);
            setCompanyStreet(myUser.companystreet);
            setCompanyPostCode(myUser.companypostcode);
            setCompanyCity(myUser.companycity);
            setEmail(myUser.email);
            setInvoice(myUser.invoice);
            setLogin(myUser.login);
            setNewsletter(myUser.newsletter);
            setPassword(myUser.password);
            setPhoneNumber(myUser.phonenumber);
            setRegulations(myUser.regulations);
            setCompanyNip(myUser.companynip);
            setCompanyRegon(myUser.companyregon);
          }
        }
      })
      .catch((err) => console.log('error fetching customers, error: ' + err))
  }, []);

  // Pobranie cookie
  function getCookie(name) {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return decodeURIComponent(value);
      }
    }
    return null;
  }

  // Usuwanie elementu z koszyka
  const handleRemove = (id) => {
    const updatedBasket = basket.filter(item => item.id !== id);
    setBasket(updatedBasket);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('basket', JSON.stringify(updatedBasket));
    }
  };

  // Obliczanie ceny całkowitej
  const totalPrice = basket.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  // Pobranie aktualnego czasu w formacie DD-MM-RRRR HH:MM:SS
  function getFormattedDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec','lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  // Obsługa zakupu
 const handleBuyNow = async () => {
  if (!acceptregulations) {
    setAcceptRegulationsInfo('Aby dokonać zakupu zaakceptuj regulamin serwisu.');
    return;
  }

  // Zachowujemy setCookie i accesses, jeśli są potrzebne
  setCookie('newaccesses', accesses, 30);

  const userCookie = getCookie('user');
  if (!userCookie) {
    navigate('/sign-up-or-sign-in');
    return;
  }

  try {
    sessionStorage.setItem('paymentStarted', 'true');

    // Dane zamówienia
    const orderData = {
      name: `${name} (klient nie opłacił jeszcze tego zamówienia)`,
      surname,
      street,
      postcode,
      city,
      companyname,
      companystreet,
      companypostcode,
      companycity,
      email,
      invoice,
      login,
      newsletter,
      password,
      phonenumber,
      regulations,
      companynip,
      companyregon,
      ordercontent: JSON.stringify(basket),
      orderamount: totalPrice,
      ordertime: getFormattedDate(),
    };

    // 🔹 Debug log przed wysyłką zamówienia
    console.log('DEBUG: orderData przed wysłaniem', orderData);

    sessionStorage.setItem('orderData', JSON.stringify(orderData));

    await axios.post(`${BACKEND_URL}/orders`, orderData)
      .then(res => console.log('DEBUG: /orders response', res.data))
      .catch(err => console.error('Błąd przy dodawaniu zamówienia', err));

    // 🔹 Przygotowanie payloadu do Tpay
    const tpayPayload = {
      items: basket,
      totalPrice: totalPrice,
      email: email || 'test@example.com',
    };

    // 🔹 Debug log przed wysyłką do Tpay
    console.log('DEBUG: tpayPayload przed wysłaniem', tpayPayload);

    const tpayResp = await fetch(`${BACKEND_URL}/tpay/create-transaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tpayPayload)
    });

    const tpayData = await tpayResp.json();

    // 🔹 Debug log odpowiedzi Tpay
    console.log('DEBUG: Tpay response', tpayData);

    // 🔹 Sprawdzenie transactionPaymentUrl
    if (!tpayResp.ok || !tpayData.transactionPaymentUrl) {
      throw new Error('Brak redirectUrl z Tpay');
    }

    // Przekierowanie do płatności
    window.location.href = tpayData.transactionPaymentUrl;

  } catch (error) {
    sessionStorage.removeItem('paymentStarted');
    sessionStorage.removeItem('orderData');
    console.error('Błąd w handleBuyNow:', error);
    alert('Wystąpił problem z płatnością. Spróbuj ponownie.');
  }
};



  if (basket.length === 0) {
    return <p>Koszyk jest pusty. <Link to="/">Powrót do strony głównej</Link></p>;
  }

  return (
    <div className="app">
      <Header />
      <div className="basketPresentationField">
        <h1>Twój koszyk</h1>

        <table className="basket-table">
          <thead>
            <tr>
              <th>Okładka kursu</th>
              <th>Tytuł</th>
              <th>Autor</th>
              <th>Cena</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {basket.map(item => (
              <tr key={item.id}>
                <td><img src={`${BACKEND_URL}${item.imageurl}`} alt={item.title} style={{ width: '80px', height: 'auto' }} /></td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.price} zł</td>
                <td><button onClick={() => handleRemove(item.id)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="basket-list">
          {basket.map(item => (
            <li key={item.id} className="basket-list-item">
              <img src={`${BACKEND_URL}${item.imageurl}`} alt={item.title} style={{ width: '100px', height: 'auto' }} />
              <div><strong>{item.title}</strong></div>
              <div>{item.author}</div>
              <div>{item.price} zł</div>
              <button onClick={() => handleRemove(item.id)}>X</button>
            </li>
          ))}
        </ul>

        <hr />
        <div className="payment-summary">
          <p><strong>Do zapłaty: {totalPrice.toFixed(2)} zł</strong></p>
          <label>
            Aby dokonać zakupu zaakceptuj <a href="/regulamin" target="_blank" rel="noopener noreferrer">regulamin serwisu</a>
            <input type="checkbox" checked={acceptregulations} onChange={(e) => setAcceptRegulations(e.target.checked)} />
          </label>
          <p className="warningToBuyNow">{acceptregulationsinfo}</p>
          <button className="buyNowButton" onClick={handleBuyNow}>Zapłać teraz</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Basket;

