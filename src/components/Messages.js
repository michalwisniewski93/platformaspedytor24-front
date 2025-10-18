import React, {useState, useEffect} from 'react'
import AdminWidgetToLogOut from './AdminWidgetToLogOut';
import { useSelector } from 'react-redux';
import http from '../api/http';

const Messages = () => {

     const isAdminLogged = useSelector(state => state.isAdminLogged)

     const [tickets, setTickets] = useState([])

      useEffect(() => {
        http.get('https://platformaspedytor8-back-production.up.railway.app/tickets')
        .then((response) => setTickets(response.data))
        .catch((err) => console.log('error fetching tickets, error: ' + err))
    }, [])


    const changeStatus = (id, statusCode) => {
        const status = !statusCode

            http.put(`https://platformaspedytor8-back-production.up.railway.app/tickets/${id}`, {status})
    .then((response) => {
            setTickets(tickets.map(ticket => ticket._id === id ? response.data : ticket));
           })
      .catch((err) => console.error("Error updating ticket status:", err));
   }
    

    return (
            <>
            {isAdminLogged ? 
            <div className="adminKokpit">
                <AdminWidgetToLogOut/>
                <div className="messagesBox">
                   <h1>Wiadomości z formularza kontaktowego</h1>
                   {tickets.map(ticket => <div className="singleTicket" key={ticket._id}>
                    <p><b>Data zgłoszenia:</b> {ticket.time}</p>
                    <p><b>Imię i nazwisko:</b> {ticket.nameandsurname}</p>
                    <p><b>E-mail:</b> {ticket.email}</p>
                    <p><b>Treść wiadomości:</b> {ticket.message}</p>
                    <p><b>Status:</b> {ticket.status ? 'obsłużony' : 'nieobsłużony'}</p>
                    <button onClick={() => changeStatus(ticket._id, ticket.status)}>Zmień status</button>
                   </div>).reverse()}
                </div>
            </div> 
            : <span>nie masz dostępu</span>}
            </>
        )
}

export default Messages;
