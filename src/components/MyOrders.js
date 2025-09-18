import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const MyOrders = () => {
  const [userorders, setUserOrders] = useState([]);
  const [login, setLogin] = useState('');
  const [hasAccess, setHasAccess] = useState(false);

  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }

  useEffect(() => {
    const cookie = getCookie('user');

    if (cookie) {
      const loginFromCookie = cookie.split(';')[0];
      setLogin(loginFromCookie);
      setHasAccess(true);

      axios
        .get('https://platformaspedytor8-back-production.up.railway.app/orders')
        .then((response) => {
          const foundOrders = response.data.filter(order => order.login === loginFromCookie);
          setUserOrders(foundOrders);
        })
        .catch((err) => console.error('Error fetching orders:', err));
    } else {
      setHasAccess(false);
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="myOrdersPresentation">
        {hasAccess ? (
          <>
            <h1>Moje zamówienia (opłacone)</h1>
            {login && userorders.length > 0 ? (
              userorders
                .slice()
                .reverse()
                .map((order) => (
                  <div className="myOrdersPresentationItem" key={order._id}>
                    <h4>czas zamówienia: {order.ordertime}</h4>
                    <h4>kwota zamówienia: {order.orderamount} zł</h4>
                    <p>
                      imię i nazwisko: {order.name} {order.surname}
                    </p>
                    <p>
                      adres: {order.street} {order.postcode} {order.city}
                    </p>
                    <p>
                      e-mail: {order.email} numer telefonu: {order.phonenumber}
                    </p>
                    
                    <p>newsletter: {order.newsletter ? 'TAK' : 'NIE'}</p>
                    <p>regulamin: {order.regulations ? 'TAK' : 'NIE'}</p>
                    <p>faktura: {order.invoice ? 'TAK' : 'NIE'}</p>
                    {order.invoice ? (
                      <>
                        <p>nazwa firmy: {order.companyname}</p>
                        <p>
                          adres firmy: {order.companystreet} {order.companypostcode}{' '}
                          {order.companycity}
                        </p>
                        <p>
                          NIP: {order.companynip} REGON: {order.companyregon}
                        </p>
                      </>
                    ) : null}
                    <p>treść zamówienia: </p>

                    <table>
                      <thead>
                        <tr>
                          <th>Tytuł</th>
                          <th>Autor</th>
                          <th>Cena</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.ordercontent.map((item, index) => (
                          <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>{item.price} zł</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
            ) : (
              <p>Ładowanie danych...</p>
            )}
          </>
        ) : (
          <h2>Nie masz dostępu</h2>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;
