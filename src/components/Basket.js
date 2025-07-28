import React, { useEffect, useState } from 'react';
import '../styles/basket.css'; // Import stylów
import Header from './Header';
import Footer from './Footer';
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [accesses, setAccesses] = useState('');
  const [customers, setCustomers] = useState([])

const [name, setName] = useState('')
const [surname, setSurname] = useState('')
const [street, setStreet] = useState('')
const [postcode, setPostCode] = useState('')
const [city, setCity] = useState('')
const [companyname, setCompanyName] = useState('')
const [companystreet, setCompanyStreet] = useState('')
const [companypostcode, setCompanyPostCode] = useState('')
const [companycity, setCompanyCity] = useState('')
const [email, setEmail] = useState('')
const [invoice, setInvoice] = useState(false)
const [login, setLogin] = useState('')
const [newsletter, setNewsletter] = useState(false)
const [password, setPassword] = useState('')
const [phonenumber, setPhoneNumber] = useState('')
const [regulations, setRegulations] = useState(false)
const [companynip, setCompanyNip] = useState(0)
const [companyregon, setCompanyRegon] = useState(0)


const [taxdatas, setTaxDatas] = useState([])

   



  const navigate = useNavigate()

  
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); // Użyj swojego klucza publicznego Stripe
  
useEffect(() => {
  axios.get('https://platformaspedytor8-back-production.up.railway.app/taxdatas')
  .then((response) => {setTaxDatas(response.data)})
   .catch((err) => console.log('error fetching taxdatas, error: ' + err))

  



}, [])

useEffect(() => {
  axios.get('https://platformaspedytor8-back-production.up.railway.app/customers')
    .then((response) => {
      setCustomers(response.data)

      const userCookie = getCookie('user')
      if(userCookie){
        const login = userCookie.split(';')[0]
        const myUser = response.data.find(customer => customer.login === login)
        if(myUser){
          setName(myUser.name)
          setSurname(myUser.surname)
          setStreet(myUser.street)
          setPostCode(myUser.postcode)
          setCity(myUser.city)
          setCompanyName(myUser.companyname)
          setCompanyStreet(myUser.companystreet)
          setCompanyPostCode(myUser.companypostcode)
          setCompanyCity(myUser.companycity)
          setEmail(myUser.email)
          setInvoice(myUser.invoice)
          setLogin(myUser.login)
          setNewsletter(myUser.newsletter)
          setPassword(myUser.password)
          setPhoneNumber(myUser.phonenumber)
          setRegulations(myUser.regulations)
          setCompanyNip(myUser.companynip)
          setCompanyRegon(myUser.companyregon)
        }
      }
    })
    .catch((err) => console.log('error fetching customers, error: ' + err))
}, [])



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





  const generateAccesses = (basketItems) => {
  return basketItems.map(item => item.accesscode).join(';');
};


function setCookie(name, value, days) {
  const now = new Date();
  now.setTime(now.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + now.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
}




useEffect(() => {
  const storedBasket = localStorage.getItem('basket');
  if (storedBasket) {
    try {
      const parsedBasket = JSON.parse(storedBasket);
      setBasket(parsedBasket);
      setAccesses(generateAccesses(parsedBasket));
    } catch (error) {
      console.error('Błąd parsowania basket z localStorage:', error);
      setBasket([]);
      setAccesses('');
    }
  }
}, []);




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



const handleRemove = (id) => {
  const updatedBasket = basket.filter(item => item.id !== id);
  setBasket(updatedBasket);
  localStorage.setItem('basket', JSON.stringify(updatedBasket));
  setAccesses(generateAccesses(updatedBasket));
};



  const totalPrice = basket.reduce((sum, item) => sum + parseFloat(item.price), 0);

  if (basket.length === 0) {
    return <p>Koszyk jest pusty. <Link to="/">Powrót do strony głównej </Link></p>;
  }



 // ... cała reszta kodu bez zmian

const handleBuyNow = async () => {
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

    // Zapisz dane tymczasowo w sessionStorage
    sessionStorage.setItem('orderData', JSON.stringify(orderData));

    //  Dodaj zamówienie do bazy (axios POST do /orders)
    await axios.post('https://platformaspedytor8-back-production.up.railway.app/orders', orderData)
      .then(() => {
        
      })
      .catch(err => {
        console.error('Błąd przy dodawaniu zamówienia', err);
      });

    // 👉 Tworzenie sesji Stripe
    const response = await fetch('https://platformaspedytor8-back-production.up.railway.app/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: basket }),
    });

    const session = await response.json();
    const stripe = await stripePromise;

    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.error(result.error.message);
      sessionStorage.removeItem('paymentStarted');
      sessionStorage.removeItem('orderData');
    }
  } catch (error) {
    sessionStorage.removeItem('paymentStarted');
    sessionStorage.removeItem('orderData');
    console.error('Błąd w handleBuyNow:', error);
  }
};



  return (
<div className="app">
        <Header/>
        <div className="basketPresentationField">
      <h1>Twój koszyk</h1>

      {/* Widok tabeli (desktop) */}
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
              <td>
                <img
                  src={`https://platformaspedytor8-back-production.up.railway.app/${item.imageurl}`}
                  alt={item.title}
                  style={{ width: '80px', height: 'auto' }}
                />
              </td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.price} zł</td>
              <td><button onClick={() => handleRemove(item.id)}>X</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Widok listy (mobile) */}
      <ul className="basket-list">
        {basket.map(item => (
          <li key={item.id} className="basket-list-item">
            <img
              src={`https://platformaspedytor8-back-production.up.railway.app/${item.imageurl}`}
              alt={item.title}
              style={{ width: '100px', height: 'auto' }}
            />
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
          <button className="buyNowButton" onClick={handleBuyNow}>Zapłać teraz</button>
          
         
      </div>
      
    </div>
        <Footer/>
        </div>



    
  );
};

export default Basket;
