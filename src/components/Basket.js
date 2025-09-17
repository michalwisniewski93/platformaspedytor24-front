import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const BACKEND_URL = 'https://platformaspedytor8-back-production.up.railway.app';

const Basket = () => {
  const [basket, setBasket] = useState([]);
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
  const [phonenumber, setPhoneNumber] = useState('');
  const [acceptregulations, setAcceptRegulations] = useState(false);
  const [acceptregulationsinfo, setAcceptRegulationsInfo] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedBasket = localStorage.getItem('basket');
    if (storedBasket) {
      try {
        setBasket(JSON.parse(storedBasket));
      } catch {
        setBasket([]);
      }
    }
  }, []);

  const totalPrice = basket.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleRemove = (id) => {
    const updatedBasket = basket.filter(item => item.id !== id);
    setBasket(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
  };

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

  const handleBuyNow = async () => {
    if (!acceptregulations) {
      setAcceptRegulationsInfo('Aby dokonać zakupu zaakceptuj regulamin serwisu.');
      return;
    }

    const userCookie = document.cookie.split('; ').find(c => c.startsWith('user='));
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
        phonenumber,
        ordercontent: JSON.stringify(basket),
        orderamount: totalPrice,
        ordertime: getFormattedDate(),
      };

      sessionStorage.setItem('orderData', JSON.stringify(orderData));

      const resp = await fetch(`${BACKEND_URL}/tpay/create-transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: basket,
          totalPrice,
          email
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
                <td><img src={`${BACKEND_URL}${item.imageurl}`} alt={item.title} style={{ width: '80px', height: 'auto' }}/></td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.price} zł</td>
                <td><button onClick={() => handleRemove(item.id)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />
        <div className="payment-summary">
          <p><strong>Do zapłaty: {totalPrice.toFixed(2)} zł</strong></p>
          <label>
            Aby dokonać zakupu zaakceptuj <a href="/regulamin">regulamin serwisu</a>
            <input type="checkbox" checked={acceptregulations} onChange={e => setAcceptRegulations(e.target.checked)} style={{ marginLeft: 8 }}/>
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
