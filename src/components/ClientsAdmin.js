import React, {useState, useEffect} from 'react'
import AdminWidgetToLogOut from './AdminWidgetToLogOut';
import { useSelector } from 'react-redux';
import http from '../api/http';
import {SERVER_URL} from "../consts";


const ClientsAdmin = () => {

     const isAdminLogged = useSelector(state => state.isAdminLogged)
     const [customers, setCustomers] = useState([])
     const [customerVisibilityEditForm, setCustomerVisibilityEditForm] = useState(false)

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
         const [editingId, setEditingId] = useState(null)
         const [accesses, setAccesses] = useState('')

     

     
  useEffect(() => {
    http.get(`${SERVER_URL}/customers`)
    .then((response) => setCustomers(response.data))
    .catch((err) => console.log('error fetching customers, error: ' + err))
   }, [])

   const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // albo 'auto' dla natychmiastowego przewinięcia
  });
};


   const handleEdit = (id, name, surname, street, postcode, city, companyname, companystreet, companypostcode, companycity, email, invoice, login, newsletter, password, phonenumber, regulations, companynip, companyregon, accesses) => {
    alert('Uwaga! Jeśli kliknąłeś Edytuj dane klienta i pojawił Ci się formularz musisz kliknąć Zedytuj klienta by nie nadpisały się dane żadnego z klientów!!!!!')
    scrollToTop()
    setCustomerVisibilityEditForm(true)
    setName(name || '')
    setSurname(surname || '')
    setLogin(login || '')
    setPassword(password || '')
    setPhoneNumber(phonenumber || '')
    setStreet(street || '')
    setPostCode(postcode || '')
    setCity(city || '')
    setEmail(email || '')
    setAccesses(accesses || '')
    
setInvoice(!!invoice)

if (invoice) {
  setCompanyName(companyname || '')
  setCompanyStreet(companystreet || '')
  setCompanyPostCode(companypostcode || '')
  setCompanyCity(companycity || '')
  setCompanyNip(companynip || '')
  setCompanyRegon(companyregon || '')
} else {
  // wyczyść dane firmowe
  setCompanyName('')
  setCompanyStreet('')
  setCompanyPostCode('')
  setCompanyCity('')
  setCompanyNip('')
  setCompanyRegon('')
}
    setNewsletter(!!newsletter)
    setRegulations(!!regulations)
    setEditingId(id)



    
   }

   const handleDelete = (id) => {
     http.delete(`${SERVER_URL}/customers/${id}`)
      .then(() => setCustomers(customers.filter(customer => customer._id !== id)))
      .catch((err) => console.error("Error deleting customer:", err));
   }


   const handleSubmit = (e) => {
    e.preventDefault()

    const companynip = companyNip
    const companyregon = companyRegon

    http.put(`${SERVER_URL}/customers/${editingId}`, {name, surname, street, postcode, city, companyname, companystreet, companypostcode, companycity, email, invoice, login, newsletter, password, phonenumber, regulations, companynip, companyregon, accesses})
   .then((response) => {
        setCustomers(customers.map(customer => customer._id === editingId ? response.data : customer));
        setName('')
         setSurname('')
         setLogin('')
         setPassword('')
         setPhoneNumber('')
         setStreet('')
         setPostCode('')
         setCity('')
         setEmail('')
         setAccesses('')
         setInvoice(false)
         setCompanyName('')
         setCompanyStreet('')
         setCompanyPostCode('')
         setCompanyCity('')
         setCompanyNip('')
         setCompanyRegon('')
         setNewsletter(false)
         setRegulations(false)
          })
     .catch((err) => console.error("Error updating shop data:", err));
     setCustomerVisibilityEditForm(false)

         
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
            <>
            {isAdminLogged ? 
            <div className="adminKokpit">
                <AdminWidgetToLogOut/>
                <div className="clientsAdminWrapper">
                    <h1>Klienci - ({customers.length})</h1>
                    {customerVisibilityEditForm ? (
                           <form className="setNewAccount" onSubmit={handleSubmit} style={{color: 'white', fontFamily: 'Verdana, sans-serif'}}>
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
                <input type="text" pattern="^[^;]*$" title="Nie używaj średnika (;)" value={login}  onChange={handleLoginChange}/>
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
                <input type="checkbox" checked={invoice} onChange={(e) => {
                    setInvoice(e.target.checked)
                }} />
            </label>
            </div>
           
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
            
           <div>
            <label>
                Newsletter:
                <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)}/>
            </label>
            <label>
                Akceptacja regulaminu sklepu (<a href="/regulamin" target="_blank" rel="noopener noreferrer">Regulamin sklepu</a>):
                <input type="checkbox"  checked={regulations} onChange={(e) => setRegulations(e.target.checked)}/>
            </label>
            <label>
                Dostępy:
                <input type="text"  value={accesses} onChange={(e) => setAccesses(e.target.value)}/>
            </label>
            <button className="buttonToEdit">Zedytuj klienta</button>
            <span style={{fontWeight: 'bold', color: 'red', fontSize: '20px'}}>UWAGA !!! NAWET JEŻELI ŻADNEGO POLA NIE EDYTUJESZ KLIKNIJ ZEDYTUJ KLIENTA, JEŻELI TEGO NIE ZROBISZ TO POLA NP. NIP REGON MOGĄ SIĘ PRZEKOPIOWAĆ Z KLIENTA KTÓRY MA FIRMĘ NA KLIENTA KTÓRY NIE MA FIRMY</span>
           </div>
        </form>
                    ) : null}
                    {customers.map(customer => <div className="clientsAdminItem" key={customer._id}>
                        <p><strong>imię i nazwisko:</strong> {customer.name} {customer.surname} </p>
                        <p><strong>adres:</strong> ul. {customer.street} kod pocztowy: {customer.postcode} miejscowość: {customer.city}</p>
                        <p><strong>e-mail: </strong> {customer.email}</p>
                        <p><strong>numer telefonu:</strong> {customer.phonenumber}</p>
                        <p><strong>login: </strong>{customer.login}</p>
                        <p><strong>hasło: </strong>{customer.password}</p>
                        <p><strong>akceptacja newslettera: </strong>{customer.newsletter ? 'TAK': 'NIE'}</p>
                        <p><strong>akceptacja regulaminu: </strong>{customer.regulations ? 'TAK' : 'NIE'}</p>
                        <p>{customer.invoice ? 'Ma firmę i chce fakturę': 'Nie ma firmy'}</p>
                        {customer.invoice ? <p><strong>Nazwa firmy:</strong> {customer.companyname}</p>: null}
                        {customer.invoice ? <p><strong>Adres firmy:</strong> {customer.companystreet} {customer.companypostcode} {customer.companycity}</p>: null}
                        {customer.invoice ? <p><strong>NIP:</strong> {customer.companynip}</p>: null}
                        {customer.invoice ? <p><strong>REGON:</strong> {customer.companyregon}</p>: null}
                        <p><strong>dostępy:</strong> {customer.accesses}</p>
                        <button className="buttonToEdit" onClick={() => handleEdit(customer._id, customer.name, customer.surname, customer.street, customer.postcode, customer.city, customer.companyname, customer.companystreet, customer.companypostcode, customer.companycity, customer.email, customer.invoice, customer.login, customer.newsletter, customer.password, customer.phonenumber, customer.regulations, customer.companynip, customer.companyregon)}>Edytuj dane klienta</button>
                        <button className="buttonToDelete" onClick={() => handleDelete(customer._id)}>Usuń klienta</button>
                    </div>)}
                </div>
            </div> 
            : <span>nie masz dostępu</span>}
            </>
        )
}

export default ClientsAdmin;
