import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'




const NewUser = () => {
    const [error, setError] = useState(''); // ← TO DODAJ jeśli brakuje
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [street, setStreet] = useState('')
    const [postcode, setPostCode] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [invoice, setInvoice] = useState(false)
    const [companyname, setCompanyName] = useState('')
    const [companystreet, setCompanyStreet] = useState('')
    const [companypostcode, setCompanyPostCode] = useState('')
    const [companycity, setCompanyCity] = useState('')
    const [companyNip, setCompanyNip] = useState('')
    const [companyRegon, setCompanyRegon] = useState('')
    const [newsletter, setNewsletter] = useState(false)
    const [regulations, setRegulations] = useState(false)

    const [customers, setCustomers] = useState([])

    const [accesses, setAccesses] = useState('xyz, ')


    useEffect(() => {
    axios.get('https://platformaspedytor8-back-production.up.railway.app/customers')
    .then((response) => setCustomers(response.data))
    .catch((err) => console.log('error fetching customers, error: ' + err))
}, [])
    

    const handleSubmit = (e) => {

       const loginExists = customers.some(customer => customer.login === login);

if (loginExists) {
    alert(`Wybrałeś login: ${login}, taki login już istnieje w naszej bazie. Zmień go by założyć konto.`);
    return; // możesz też np. zatrzymać submit formularza w tym miejscu
}

        
    e.preventDefault()
    if(name === '' || surname === '' || street === '' || postcode === '' || city === '' || email === '' || invoice === '' || login === '' || password === '' || phonenumber === '')
    {
        alert('wszystkie pola formularza muszą być wypełnione')
        return
    }
    if(regulations === false){
        alert ('nie zaakceptowałeś regulaminu')
        return 
    }

    let companynip = companyNip
    let companyregon = companyRegon

    if(!companyname === '' || !companystreet === '' || !companypostcode === '' || !companycity === '' ||  isNaN(companyNip) || isNaN(companyRegon))
    {
      
        setCompanyName(null)
        setCompanyStreet(null)
        setCompanyPostCode(null)
        setCompanyCity(null)
        setCompanyNip(null)
        setCompanyRegon(null)
    }
    
    axios.post("https://platformaspedytor8-back-production.up.railway.app/customers", {name, surname, street, postcode, city, companyname, companystreet, companypostcode, companycity, email, invoice, login, newsletter, password, phonenumber, regulations, companynip, companyregon, accesses})
        .then((response => setCustomers([...customers, response.data])))
        .catch(err => {
            console.error('Error adding customers', err)
            alert('uuups ... coś poszło nie tak!')
        })

  
    
    alert('założyłeś konto pomyślnie')


    setName('')
    setSurname('')
    setStreet('')
    setPostCode('')
    setCity('')
    setEmail('')
    setInvoice(false)
    setLogin('')
    setNewsletter(false)
    setPassword('')
    setPhoneNumber('')
    setRegulations(false)  
    setCompanyName('')
    setCompanyStreet('')
    setCompanyPostCode('')
    setCompanyCity('')
    setCompanyNip('')
    setCompanyRegon('')
    setAccesses('xyz, ')

    }

    const handleLoginChange = (e) => {
    const value = e.target.value;
    setLogin(value);

    // Sprawdzenie, czy jest średnik
    if (value.includes(';')) {
      setError('Nie używaj średnika (;) w loginie');
    } else {
      setError('');
    }
  };

    return (
        <div className="app">
                <Header/>
                <div className="registration">
                    <h1>Zarejestruj się</h1>
                    <form className="setNewAccount" onSubmit={handleSubmit}>
            <div>
            <label>
                Imię:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Nazwisko:
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/>
            </label>
            <label>
                Login:
                <input type="text" pattern="^[^;]*$" title="Nie używaj średnika (;)" value={login} onChange={handleLoginChange}/>
            </label>
            <label>
                Hasło:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>

            <label>
                Nr telefonu:
                <input type="text"  value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            </label>
            </div>
            <div>
            <label>
                Adres (ulica, nr mieszkania/nr domu):
                <input type="text"  value={street} onChange={(e) => setStreet(e.target.value)}/>
            </label>
            <label>
                Kod pocztowy:<span className="additionalInfo">(5 cyfr,  format: 85790)</span>
                <input type="text" maxLength="5" minLength="5" value={postcode} onChange={(e) => setPostCode(e.target.value)} />
            </label>
            <label>
                Miejscowość:
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
            </label>
            <label>
                E-mail:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Czy chcesz fakturę:
                <input type="checkbox" value={invoice} onChange={(e) => {
                    setInvoice(e.target.checked)
                }} />
            </label>
            </div>
            {invoice ? (
               <div>
 <label>
                Nazwa firmy (opcjonalnie):
                <input type="text" value={companyname} onChange={(e) => setCompanyName(e.target.value)} />
            </label>
            <label>
                Adres firmy (ulica):
                <input type="text"  value={companystreet} onChange={(e) => setCompanyStreet(e.target.value)}/>
            </label>
            <label>
                Kod pocztowy firmy: (5 cyfr,  format: 85790)
                <input type="text"  minLength="5" maxLength="5" value={companypostcode} onChange={(e) => setCompanyPostCode(e.target.value)}/>
            </label>
            <label>
                Miejscowość firmy:
                <input type="text"  value={companycity} onChange={(e) => setCompanyCity(e.target.value)}/>
            </label>
           
            <label>
                NIP (10 cyfr):
                <input type="text" maxLength="10" minLength="10" value={companyNip} onChange={(e) => setCompanyNip(e.target.value)} />
            </label>
            <label>
                REGON (9 cyfr):
                <input type="text" maxLength="9" minLength="9" value={companyRegon} onChange={(e) => setCompanyRegon(e.target.value)}/>
            </label>
               </div>
            ): null}
           <div>
            <label>
                Newsletter:
                <input type="checkbox" value={newsletter} onChange={(e) => setNewsletter(e.target.checked)}/>
            </label>
            <label>
                Akceptacja regulaminu sklepu (<a href="/regulamin" target="_blank" rel="noopener noreferrer">Regulamin sklepu</a>):
                <input type="checkbox"  value={regulations} onChange={(e) => setRegulations(e.target.checked)}/>
            </label>
            <button>Załóż konto</button>
           </div>
        </form>
                    
                 </div>
                <Footer/>
        </div>
    )
}

export default NewUser
