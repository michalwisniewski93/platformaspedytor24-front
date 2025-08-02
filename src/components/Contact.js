import React, {useState, useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'


const Contact = () => {

const now = new Date();

const day = String(now.getDate()).padStart(2, '0');
const month = String(now.getMonth() + 1).padStart(2, '0'); // miesiące są od 0 do 11
const year = now.getFullYear();

const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

const formatted = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;


const [nameandsurname, setNameandsurname] = useState('')
const [email, setEmail] = useState('')
const [messageContent, setMessageContent] = useState('')
const [tickets, setTickets] = useState([])

const [num1, setNum1] = useState(0)
const [num2, setNum2] = useState(0)
const [userAnswer, setUserAnswer] = useState('')
const [captchaError, setCaptchaError] = useState('')




const generateCaptcha = () => {
  const a = Math.floor(Math.random() * 10) + 1
  const b = Math.floor(Math.random() * 10) + 1
  setNum1(a)
  setNum2(b)
  setUserAnswer('')
  setCaptchaError('')
}


useEffect(() => {
  generateCaptcha()
}, [])


const handleMessage = (e) => {
  e.preventDefault();

  const correctAnswer = num1 + num2;
  const answer = parseInt(userAnswer);

  if (isNaN(answer) || answer !== correctAnswer) {
    setCaptchaError('Niepoprawna odpowiedź. Spróbuj ponownie.');
    return; // NIE generuj nowej captcha od razu
  }

  // CAPTCHA ok — więc nowa captcha może być wygenerowana:
  generateCaptcha();
  setCaptchaError('');

  const message = messageContent;
  const time = formatted;
  const status = false;

  axios
    .post("https://platformaspedytor8-back-production.up.railway.app/tickets", {
      nameandsurname,
      email,
      message,
      time,
      status,
    })
    .then((response) => setTickets([...tickets, response.data]))
    .catch((err) => console.error("Error adding tickets", err));

  alert("Wiadomość została wysłana, dziękujemy.");
  setNameandsurname("");
  setEmail("");
  setMessageContent("");
  setTickets([]);
};




    return (
        <div className="app">
        <Header/>
        <div className="contactPage">
            <h1>Kontakt</h1>
            <div className="contactData">
                <div className="contactDataInfo">
                    <h3>Skontaktuj się z nami:</h3>
                     <p>{String.fromCodePoint(0x1F4E7)} e-mail: spedytorszkolenia@gmail.com</p><br/>
                     <p>SpedytorSzkolenia.pl - LOGI DIGITAL Krzysztof Wiśniewski, Radosław Wiśniewski<br/>ul.Derdowskiego 9/17, 85-795 Bydgoszcz (Polska)
                     <br/> NIP: 5541012980</p>
                </div>
                <div className="contactFormContainer">
                    <h3>Formularz kontaktowy</h3>
                    <form onSubmit={handleMessage}>
                        Czas pisania wiadomości: {formatted}
                        <label htmlFor="">Imię i nazwisko:
                            <input type="text" value={nameandsurname} onChange={(e) => setNameandsurname(e.target.value)}/>
                        </label>
                        <label htmlFor="">Adres e-mail: 
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </label>
                        <label htmlFor="">Treść wiadomości: 
                            <textarea name="" id="" value={messageContent} onChange={(e) => setMessageContent(e.target.value)}></textarea>
                        </label>
                        <label>
  Potwierdź, że nie jesteś robotem: ile to {num1} + {num2}?
  <input
  style={{width: '50px'}}
    type="number"
    value={userAnswer}
    onChange={(e) => setUserAnswer(e.target.value)}
    required
  />
</label>
{captchaError && <p style={{ color: 'red' }}>{captchaError}</p>}
                        <button type="submit">Wyślij wiadomość {String.fromCodePoint(0x1F680)}</button>
                    </form>
                </div>
            </div>
           

            
        </div>
        <Footer/>
        </div>
    )
}

export default Contact
