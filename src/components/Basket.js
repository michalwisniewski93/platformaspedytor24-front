import React, { useEffect, useState } from 'react';
import '../styles/basket.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = 'https://platformaspedytor8-back-production.up.railway.app';

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [accesses, setAccesses] = useState('');
  const [customers, setCustomers] = useState([]);

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

  const [taxdatas, setTaxDatas] = useState([]);
  const [acceptregulations, setAcceptRegulations] = useState(false);
  const [acceptregulationsinfo, setAcceptRegulationsInfo] = useState('');

  const navigate = useNavigate();

  // Pobranie taxdatas
  useEffect(() => {
    axios.get(`${BACKEND_URL}/taxdatas`)
      .then(res => setTaxDatas(res.data))
      .catch(err => console.error('Błąd pobierania taxdatas:', err));
  }, []);

  // Pobranie klientów i wypełnienie formularza jeśli zalogowany
  useEffect(() => {
    axios.get(`${BACKEND_URL}/customers`)
      .then(res => {
        setCustomers(res.data);
        const userCookie = getCookie('user');
        if (userCookie) {
          const loginFromCookie = userCookie.split(';')[0];
          const myUser = res.data.find(c => c.login === loginFromCookie);
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
      .catch(err => console.error('Błąd pobierania klientów:', err));
  }, []);

  // Wczytanie koszyka z localStorage
  useEffect(() => {
    const storedBasket = localStorage.getItem('basket');
    if (storedBasket) {
      try {
        const parsed = JSON.parse(storedBasket);
        setBasket(parsed);
        setAccesses(generateAccesses(parsed));
      } catch {
        setBasket([]);
        setAccesses('');
      }
    }
  }, []);

  const totalPrice = basket.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const generateAccesses = (basketItems) => basketItems.map(item => item.accesscode).join(';');

  const setCookie = (name, value, days) => {
    const now = new Date();
    now.setTime(now.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${now.toUTCString()}; path=/`;
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  };

  const handleRemove = (id) => {
    const updated = basket.filter(item => item.id !== id);
    setBasket(updated);
    localStorage.setItem('basket', JSON.stringify(updated));
    setAccesses(generateAccesses(updated));
  };

  function getFormattedDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const months = ['styczeń','luty','marzec','kwiecień','maj','czerwiec','lipiec','sierpień','wrzesień','październik','listopad','grudzień'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2,'0');
    const minutes = String(date.getMinutes()).padStart(2,'0');
    const seconds = String(date.getSeconds()).padStart(2,'0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const handleBuyNow = async () => {
    if (!acceptregulations) {
      setAcceptRegulationsInfo('Aby dokonać zakupu zaakceptuj regulamin serwisu.');
      return;
    }

    setCookie('newaccesses', accesses, 30);

    const userCookie = getCookie('user');
    if (!userCookie) {
      navigate('/sign-up-or-sign-in');
      return;
    }

    try {
      sessionStorage.setItem('paymentStarted', 'true');

      const orderData = {
        name,
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

      sessionStorage.setItem('orderData', JSON.stringify(orderData));

      await axios.post(`${BACKEND_URL}/orders`, orderData).catch(err => console.error(err));

      const resp = await fetch(`${BACKEND_URL}/tpay/create-transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: basket,
          amount: totalPrice,
          payer: { email, name: `${name} ${surname}`.trim(), phone: phonenumber || '' }
        })
      });

      if (!resp.ok) throw new Error('Nie udało się utworzyć transakcji Tpay');
      const data = await resp.json();

      if (data.transactionId) sessionStorage.setItem('tpayTransactionId', data.transactionId);
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error('Brak redirectUrl z Tpay');
      }
    } catch (err) {
      sessionStorage.removeItem('paymentStarted');
      sessionStorage.removeItem('orderData');
      console.error('Błąd w handleBuyNow:', err);
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
                <td><img src={`${BACKEND_URL}${item.imageurl}`} alt={item.title} style={{ width: '80px' }} /></td>
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
              <img src={`${BACKEND_URL}${item.imageurl}`} alt={item.title} style={{ width: '100px' }} />
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
          <label style={{ display: 'block' }}>
            Aby dokonać zakupu zaakceptuj <a href="/regulamin" target="_blank" rel="noopener noreferrer">regulamin serwisu</a>
            <input type="checkbox" checked={acceptregulations} onChange={e => setAcceptRegulations(e.target.checked)} style={{ marginLeft: 8 }} />
          </label>
          <p className="warningToBuyNow" style={{ display: 'block' }}>{acceptregulationsinfo}</p>
          <button className="buyNowButton" onClick={handleBuyNow}>Zapłać teraz</button>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Basket;

