import React, {useState, useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import { useNavigate, Link } from 'react-router-dom'
import http from '../api/http';
import {SERVER_URL} from "../consts";
import {login as loginUser} from "../api/auth";


const LogInToMakePayment = () => {



    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [customers, setCustomers] = useState([])
    const [captchaA, setCaptchaA] = useState(0);
    const [captchaB, setCaptchaB] = useState(0);
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [captchaValid, setCaptchaValid] = useState(true);
    const [user, setUser] = useState('')


    const navigate = useNavigate()

 useEffect(() => {
    http.get(`${SERVER_URL}/customers`)
    .then((response) => setCustomers(response.data))
    .catch((err) => console.log('error fetching customers, error: ' + err))
   }, [])


   
      const generateCaptcha = () => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        setCaptchaA(a);
        setCaptchaB(b);
        setCaptchaAnswer('');
     }
   
      useEffect(() => {
         generateCaptcha(); // Wygeneruj na początku
       }, []);


       function setCookie(name, value, days) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`;
}

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



       const handleSubmit = async (e) => {
  e.preventDefault()


  const correctAnswer = captchaA + captchaB;
    if (parseInt(captchaAnswer) !== correctAnswer) {
      setCaptchaValid(false);
      generateCaptcha(); // Wygeneruj nowe pytanie po błędzie
      return;
    }

    setCaptchaValid(true);


  
const found = customers.find(customer => 
        customer.login === login && customer.password === password
    );

    if(found){
        alert('✅ Zalogowano pomyślnie')
        await loginUser(login, password);
        setCookie('perm', 'ok', 30);
        setCookie("user", login + ';' + password, 30);
       


        const userCookie = getCookie('user');
          if (userCookie) {
            setUser(userCookie);
      
          } else {
              alert('Nie znaleziono ciasteczka "user".');
        }



       
    } else {
        alert ('Podałeś niepoprawny login lub hasło.')
    }


      // Tu Resetuj formularz
    
    generateCaptcha();
    setLogin('')
    setPassword('')
    navigate('/basket')
}




    return(
         <div className="app">
        <Header/>
        <div className="logInToMakePayment">
            <h1>Zaloguj się by zrealizować płatność</h1>

 
          <div className="loggingPanel" style={{backgroundColor: 'white'}}>
         
          <form action="" >
            <label>login: <input type="text" value={login} onChange={(e) => setLogin(e.target.value)}/></label>
            <label>hasło: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></label>
            <label>
        Ile to jest {captchaA} + {captchaB}? &nbsp;
        <input className="captcha"
          type="number"
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value)}
          required
        />
      </label>
      {!captchaValid && <p style={{ color: 'red' }}>❌ Niepoprawna odpowiedź. Spróbuj ponownie.</p>}
            <button onClick={handleSubmit}>Zaloguj się</button>
          </form>
           </div>
      

        </div>
        <Footer/>
        </div>
    )
}

export default LogInToMakePayment
