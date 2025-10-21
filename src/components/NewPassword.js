import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import http from '../api/http';
import {SERVER_URL} from "../consts";




const NewPassword = () => {


    const [customers, setCustomers] = useState([])
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [newPassword, setNewPassword] = useState('')


 useEffect(() => {
    http.get(`${SERVER_URL}/customers`)
    .then((response) => setCustomers(response.data))
    .catch((err) => console.log('error fetching customers, error: ' + err))
   }, [])


const handleSubmit = (e) => {
  e.preventDefault();
  const single = customers.filter(customer => customer.login === login);

  if (single.length === 0) {
    alert('Taki login nie istnieje w naszej bazie.');
    return 
  } else {
    
    if(login === single[0].login && city === single[0].city && email === single[0].email)
    {
        const editingId = single[0]._id
        const password = newPassword
        // tu będzie put które zmienia password

         http.put(`${SERVER_URL}/customers/${editingId}`, {password: newPassword})
           .then((response) => {
                setCustomers(customers.map(customer => customer._id === editingId ? response.data : customer));
                setLogin('')
                setEmail('')
                setCity('')
                setNewPassword('')
                alert('Zmieniono Twoje hasło poprawnie.')
                  })
             .catch((err) => console.error("Error updating customer password:", err));
    }else {
        alert('Któreś z danych które podałeś są niepoprawne.')
        return 
    }
        
   
  }



};


    return (
        <div className="app">
                <Header/>
                <div className="createNewPassword">
                    <h1>Wygeneruj nowe hasło</h1>
                    <h6>Formularz poprosi Cię o podanie kilku danych weryfikacyjnych, muszą być one zgodne z tymi które ustawiłeś podczas rejestracji konta.</h6>
                    <form action="">
                        <label>Wpisz ustawiony przez Ciebie login podczas rejestracji: <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} /></label>
                        <label>Wpisz ustawiony przez Ciebie adres-email podczas rejestracji: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/></label>
                        <label>Wpisz ustawione przez Ciebie miasto podczas rejestracji: <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/></label>
                        <label>Wpisz jakie ma być nowe hasło: <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/></label>
                        <button onClick={handleSubmit}>Ustaw nowe hasło</button>
                    </form>
                    
                  
                    
                 </div>
                <Footer/>
        </div>
    )
}

export default NewPassword
