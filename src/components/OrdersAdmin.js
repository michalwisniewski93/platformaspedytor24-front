import React, { useState, useEffect } from 'react';
import AdminWidgetToLogOut from './AdminWidgetToLogOut';
import { useSelector } from 'react-redux';
import axios from 'axios';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);

  // Przykład pobrania stanu admina z reduxa (dopasuj do swojego store)
  const isAdminLogged = useSelector(state => state.isAdminLogged);

  useEffect(() => {
    axios.get('https://platformaspedytor8-back.vercel.app/orders')
      .then(response => setOrders(response.data))
      .catch(err => console.log('error fetching customers, error: ' + err));
  }, []);

  return (
    <>
      {isAdminLogged ? (
        <div className="adminKokpit">
          <AdminWidgetToLogOut />
          <div className="ordersAdminWrapper">
            <h1>Zamówienia - ({orders.length})</h1>
            {orders.map(order => (
              <div className="ordersAdminItem" key={order._id}>
               <h4>czas zamówienia: {order.ordertime}</h4>
               <h4>kwota zamówienia: {order.orderamount} zł</h4>
               <p>imię i nazwisko: {order.name} {order.surname}</p>
               <p>adres: {order.street} {order.postcode} {order.city}</p>
               <p>e-mail: {order.email} numer telefonu: {order.phonenumber}</p>
               <p>login: {order.login} hasło: {order.password}</p>
               <p>newsletter: {order.newsletter ? 'TAK': 'NIE'}</p>
               <p>regulamin: {order.regulations ? 'TAK': 'NIE'}</p>
               <p>faktura: {order.invoice ? 'TAK': 'NIE'}</p>
               {order.invoice? <>
               <p>nazwa firmy: {order.companyname}</p>
               <p>adres firmy: {order.companystreet} {order.companypostcode} {order.companycity}</p>
               <p>NIP: {order.companynip} REGON: {order.companyregon}</p>
               </>
               : null}
               <p>kwota zamówienia: {order.orderamount} zł</p>
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
    {JSON.parse(order.ordercontent).map((item, index) => (
      <tr key={index}>
        <td>{item.title}</td>
        <td>{item.author}</td>
        <td>{item.price} zł</td>
      </tr>
    ))}
  </tbody>
</table>
                
              </div>
            )).reverse()}
          </div>
        </div>
      ) : (
        <span>nie masz dostępu</span>
      )}
    </>
  );
};

export default OrdersAdmin;
