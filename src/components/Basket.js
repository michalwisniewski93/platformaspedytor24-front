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

  // Pobranie koszyka z localStorage
  useEffect(() => {
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
  }, []);

  // Pobranie klientów i uzupełnienie danych zalogowanego użytkownika
  useEffect(() => {
    axios.get(`${BACKEND_URL}/customers`)
      .then((response) => {
        setCustomers(response.data);
        const userCookie = getCookie('user');
        if (userCookie) {
          const login = userCookie.split(';')[0];
          const myUser = response.data.find(customer => customer.login === login);
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
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }

  // Usuwanie elementu z koszyka
  const handleRemove = (id) => {
    const updatedBasket = basket.filter(item => item.id !== id);
    setBasket(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
  };

  // Obliczanie ceny całkowitej
  const totalPrice = basket.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  if (basket.length === 0) {
    return <p>Koszyk jest pusty. <Link to="/">Powrót do strony głównej</Link></p>;
  }

  // Obsługa zakupu
  const handleBuyNow = async () => {
    try {
      // 1. Tworzymy zamówienie
      const orderResp = await axios.post(
        `${BACKEND_URL}/orders`,
        {
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
          ordercontent: JSON.stringify(basket), // zamiast items
          orderamount: totalPrice,
          ordertime: new Date().toLocaleString("pl-PL", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        }
      );

      console.log("✅ Zamówienie zapisane:", orderResp.data);

      // 2. Tworzymy transakcję w Tpay
      const tpayResp = await axios.post(
        `${BACKEND_URL}/tpay/create-transaction`,
        {
          items: basket, // zamiast items
          totalPrice,
          email,
        }
      );

      const tpayData = tpayResp.data;
      console.log("✅ Tpay response:", tpayData);

      // 3. Sprawdzamy czy jest transactionPaymentUrl
      if (!tpayData.transactionPaymentUrl) {
        console.error("❌ Brak transactionPaymentUrl w odpowiedzi Tpay", tpayData);
        throw new Error("Nie udało się utworzyć transakcji Tpay");
      }

      // 4. Przekierowanie użytkownika do płatności
      window.location.href = tpayData.transactionPaymentUrl;

    } catch (error) {
      console.error("❌ Błąd w handleBuyNow:", error);
      alert("Wystąpił problem przy składaniu zamówienia lub płatności.");
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="basketPresentationField">
        <h1>Twój koszyk</h1>

        {/* Tabela desktop */}
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

        {/* Lista mobile */}
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
