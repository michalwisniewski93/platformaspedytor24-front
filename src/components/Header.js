import React, {useEffect, useState} from 'react'
import { FaTruck } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import http from '../api/http';
import {SERVER_URL} from "../consts";
import {login as loginUser, logout} from '../api/auth';

const Header = () => {

const navigate = useNavigate()

const [isLoggingPanelVisible, setIsLoggingPanelVisible] = useState(false)

const [login, setLogin] = useState('')
const [password, setPassword] = useState('')
const [customers, setCustomers] = useState([])
const [captchaA, setCaptchaA] = useState(0);
const [captchaB, setCaptchaB] = useState(0);
const [captchaAnswer, setCaptchaAnswer] = useState('');
const [captchaValid, setCaptchaValid] = useState(true);
const [user, setUser] = useState('')
const [basketLength, setBasketLength] = useState(0);
const [basketCount, setBasketCount] = useState(0);

function setCookie(name, value, days) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`;
}

useEffect(() => {
    const basket = localStorage.getItem('basket');

    // Jeśli nie ma koszyka w localStorage, ustaw pustą tablicę
    if (!basket) {
      localStorage.setItem('basket', JSON.stringify([]));
    }
  }, []);



  useEffect(() => {
    const basket = localStorage.getItem('basket');
    if (basket) {
      try {
        const parsedBasket = JSON.parse(basket);

        setBasketLength(parsedBasket.length);

        const totalPrice = parsedBasket.reduce((sum, item) => {
          return sum + (Number(item.price) || 0);
        }, 0);

        setBasketCount(totalPrice);
      } catch (error) {
        console.error('Błąd parsowania basket z localStorage:', error);
        setBasketLength(0);
        setBasketCount(0);
      }
    } else {
      setBasketLength(0);
      setBasketCount(0);
    }
  });

 useEffect(() => {
    const menuIcon = document.querySelector('.menuicon');
    const menu = document.querySelector('.menu');

    const handleClick = () => {
      menu.classList.toggle('active');
    };

    if (menuIcon) {
      menuIcon.addEventListener('click', handleClick);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (menuIcon) {
        menuIcon.removeEventListener('click', handleClick);
      }
    };
  }, []);


  const styles = {
  hero: {
    maxWidth: '1940px',
    margin: '0 auto',
    
  }
};


     
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

const handleSignIn = () => {
  navigate('/new-user')
}


const handleLoggingPanelVisible = () => {
  setIsLoggingPanelVisible(true)
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
        setIsLoggingPanelVisible(false)
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
}


const handleLogout = async () => {
    await logout();
    deleteCookie('user');
    deleteCookie('perm')
    setUser(null);
    navigate('/')
  };


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

function deleteCookie(name) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}


const handleMyCourses = () => {
  navigate('/moje-kursy')
}

const handleMyOrders = () => {
  navigate('/moje-zamowienia')
}

const handleMyProfile = () => {
  navigate('/moj-profil')
}

const handleClickOnBasket = () => {
  navigate('/basket')
}

const handleMyInvoices = () => {
  navigate('/moje-faktury')
}

    return (
        <>
        <div className="logo"><h1><FaTruck size={30}  style={{ verticalAlign: 'middle' }}/>SpedytorSzkolenia.pl</h1></div>
  <div className="logo">
  <img 
    src="/logospedytorszkoleniadocelowe.png" 
    alt="spedytorszkolenia.pl logo" 
    style={{ height: '50px' }}
  />
</div>
        <div className="menuicon">
            <FaBars/>
        </div>
        <div className="menu" style={styles.hero}>
          <div className="menu-links">
            <Link to="/">Start</Link>
            <Link to="/o-nas">O naszej platformie</Link>
            <Link to="/kursy">Kursy z certyfikatem</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/kontakt">Kontakt</Link>
          </div>
        </div>
        <div className="logging">
          
           
          {!isLoggingPanelVisible && !getCookie('user') && (
                      <button onClick={handleLoggingPanelVisible}>Zaloguj się</button>
          )}
          <p>{getCookie('user') ? `Zalogowano jako: ${getCookie('user').split(';')[0]}` : null}</p>
          {getCookie('user') ? <button onClick={handleMyProfile}>Profil</button> : null }
          {getCookie('user') ? <button onClick={handleMyCourses}>Moje kursy</button> : null }
          {getCookie('user') ? <button onClick={handleMyOrders}>Moje zamówienia</button> : null }
          {getCookie('user') ? <button onClick={handleMyInvoices}>Moje faktury</button> : null }
          {getCookie('user') ? <button onClick={handleLogout}>Wyloguj się</button> : null }
          {getCookie('user') ? null : <button onClick={handleSignIn}>Zarejestruj się</button> }
          <button onClick={handleClickOnBasket}>Koszyk ({basketLength})</button>

          
        </div>
        {isLoggingPanelVisible ? (
          <div className="loggingPanel">
          <h1>Zaloguj się</h1>
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
          <h3>Jeżeli nie masz jeszcze konta <Link to="/new-user">Zarejestruj się</Link>. Jeżeli nie pamiętasz hasła <Link to="/change-password">Wygeneruj nowe hasło</Link>.</h3>
        </div>
        ) : null}
        
        </>
    )
}

export default Header
