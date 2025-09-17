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

  // ============================================================
  // Obsługa zakupu
  // ============================================================
 const handleBuyNow = async () => {
  try {
    if (!basket || basket.length === 0) {
      alert("Koszyk jest pusty");
      return;
    }

    if (!acceptregulations) {
      alert("Musisz zaakceptować regulamin, aby dokonać zakupu");
      return;
    }

    // Obliczanie całkowitej ceny
    const totalPrice = basket.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

    // Przygotowanie obiektu customer z wartościami domyślnymi
    const customer = {
      name: name || "",
      surname: surname || "",
      street: street || "",
      postcode: postcode || "",
      city: city || "",
      companyname: companyname || "",
      companystreet: companystreet || "",
      companypostcode: companypostcode || "",
      companycity: companycity || "",
      email: email || "",
      invoice: invoice || false,
      login: login || "",
      newsletter: newsletter || false,
      password: password || "",
      phonenumber: phonenumber || "",
      regulations: regulations || false,
      companynip: companynip?.toString() || "",
      companyregon: companyregon?.toString() || "",
    };

    // 1️⃣ Tworzenie zamówienia w backendzie
    const orderResponse = await axios.post(
      `${BACKEND_URL}/orders`,
      {
        ...customer,
        ordercontent: JSON.stringify(basket), // zamiana tablicy na string JSON
        orderamount: totalPrice,
        ordertime: new Date().toISOString(),
      }
    );

    console.log("✅ Zamówienie zapisane:", orderResponse.data);

    // 2️⃣ Tworzenie transakcji Tpay
    const tpayResponse = await axios.post(
      `${BACKEND_URL}/tpay/create-transaction`,
      {
        items: basket,
        totalPrice, // liczba
        email: customer.email,
      }
    );

    console.log("✅ Tpay response:", tpayResponse.data);

    const { transactionPaymentUrl } = tpayResponse.data;

    if (!transactionPaymentUrl) {
      throw new Error("Brak transactionPaymentUrl z Tpay");
    }

    // 3️⃣ Przekierowanie użytkownika na stronę płatności
    window.location.href = transactionPaymentUrl;

  } catch (err) {
    console.error("Błąd w handleBuyNow:", err);
    alert(err.response?.data?.error || err.message || "Wystąpił błąd podczas zakupu");
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
                <td><img src={`https://platformaspedytor8-back-production.up.railway.app${item.imageurl}`} alt={item.title} style={{ width: '80px', height: 'auto' }} /></td>
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
              <img src={`https://platformaspedytor8-back-production.up.railway.app/${item.imageurl}`} alt={item.title} style={{ width: '100px', height: 'auto' }} />
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
