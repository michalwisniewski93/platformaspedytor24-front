import React, {useState, useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'


const Admin = () => {


     const [captchaA, setCaptchaA] = useState(0);
     const [captchaB, setCaptchaB] = useState(0);
     const [captchaAnswer, setCaptchaAnswer] = useState('');
     const [captchaValid, setCaptchaValid] = useState(true);
     const [login, setLogin] = useState('')
     const [password, setPassword] = useState('')
     const [admins, setAdmins] = useState([])


     const navigate = useNavigate()
     const dispatch = useDispatch()


     const changeAdminLogged = () => dispatch({type: 'CHANGE_ADMIN_LOGGED'})

     
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


  
useEffect(() => {
    axios.get('https://platformaspedytor8-back.vercel.app/login')
    .then((response) => setAdmins(response.data))
    .catch((err) => console.log('error fetching admins, error: ' + err))
}, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const correctAnswer = captchaA + captchaB;
    if (parseInt(captchaAnswer) !== correctAnswer) {
      setCaptchaValid(false);
      generateCaptcha(); // Wygeneruj nowe pytanie po błędzie
      return;
    }

    setCaptchaValid(true);

    // Tu dodajesz logikę wysyłki formularza

const found = admins.find(admin => 
        admin.login === login && admin.password === password
    );

    if(found){
        alert('✅ Zalogowano pomyślnie')
        changeAdminLogged()
        navigate('/admin-main-page')
    } else {
        alert ('Dane niepoprawne')
    }



    // Tu Resetuj formularz
    
    generateCaptcha();
  }

    return(
        <div className="app">
                <Header/>
                <div className="adminPage">
                    <h1>Panel administracyjny</h1>
                    <h3 className="adminInfo1">Uwaga, to miejsce dla administratora. To nie jest miejsce do logowania do serwisu. Aby się zalogować na Konto klienta kliknij przycisk Zaloguj się w górnej części strony.</h3>
                    <h3 className="adminInfo2">Jeżeli zaś posiadasz uprawnienia administratora zaloguj się przy pomocy poniższego formularza.</h3>
                   
                   <form action="">
                    <label htmlFor="">Login:
                        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
                    </label>
                    <label htmlFor="">Hasło:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
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
      <br />
                    <button onClick={handleSubmit}>Zaloguj się jako administrator</button>
                   </form>
        
                    
                </div>
                <Footer/>
                </div>
    )
}

export default Admin