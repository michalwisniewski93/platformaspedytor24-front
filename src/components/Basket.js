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

  // ===============================
  // Funkcje do obsługi cookies
  // ===============================
  function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }

  function updateAccessCookie(newBasket) {
    const codes = newBasket.map(item => item.accesscode);
    const cookieValue = codes.join(';');
    setCookie('newaccesses', cookieValue);
  }

  // ===============================
  // Pobranie koszyka z localStorage
  // ===============================
  useEffect(() => {
    const storedBasket = localStorage.getItem('basket');
    if (storedBasket) {
      try {
        const parsedBasket = JSON.parse(storedBasket);
        setBasket(parsedBasket);
        updateAccessCookie(parsedBasket);
      } catch (error) {
        console.error('Błąd parsowania basket z localStorage:', error);
        setBasket([]);
        setCookie('newaccesses', '');
      }
    }
  }, []);

  // ===============================
  // Pobranie klientów i uzupełnienie danych zalogowanego użytkownika
  // ===============================
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

  // ===============================
  // Usuwanie elementu z koszyka
  // ===============================
  const handleRemove = (id) => {
    const updatedBasket = basket.filter(item => item.id !== id);
    setBasket(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    updateAccessCookie(updatedBasket);
  };

  // ===============================
  // Obliczanie ceny całkowitej
  // ===============================
  const totalPrice = basket.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  if (basket.length === 0) {
    return <p>Koszyk jest pusty. <Link to="/">Powrót do strony głównej</Link></p>;
  }

  // ===============================
  // Obsługa zakupu
  // ===============================
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

      // 1️⃣ Tworzenie transakcji Tpay
      const tpayResponse = await axios.post(`${BACKEND_URL}/tpay/create-transaction`, {
        items: basket,
        totalPrice,
        email: customer.email,
      });

      console.log("DEBUG: pełna odpowiedź z /tpay/create-transaction:", tpayResponse.data);

      const { transactionPaymentUrl, transactionId, title } = tpayResponse.data;

      if (!transactionPaymentUrl) {
        console.error("❌ Nie znaleziono transactionPaymentUrl w odpowiedzi:", tpayResponse.data);
        alert("Nie udało się pobrać linku do płatności. Sprawdź konsolę.");
        return;
      }

      // 2️⃣ Zapis zamówienia do bazy z transactionId i title
      const orderResponse = await axios.post(`${BACKEND_URL}/orders`, {
        ...customer,
        ordercontent: basket,
        orderamount: totalPrice,
        ordertime: new Date().toISOString(),
        transactionId,
        title
      });

      console.log("✅ Zamówienie zapisane:", orderResponse.data);

      // 3️⃣ Zapis danych do sessionStorage i przekierowanie
      sessionStorage.setItem("orderData", JSON.stringify({
        ...customer,
        ordercontent: basket,
        orderamount: totalPrice,
        ordertime: new Date().toISOString(),
        login: login,
        transactionId,
        title
      }));

      sessionStorage.setItem("tpayTransactionId", transactionId);

      window.open(transactionPaymentUrl, "_blank"); // otwiera Tpay w nowej karcie
      navigate("/payment-waiting"); // komponent pollingowy oczekujący na status

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
