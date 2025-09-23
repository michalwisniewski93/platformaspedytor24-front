import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  
  const [hasAccess, setHasAccess] = useState(false);
  const [customerVisibilityEditForm, setCustomerVisibilityEditForm] = useState(false)
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')
  const [street, setStreet] = useState('')
  const [postcode, setPostCode] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
 
  
  const [newsletter, setNewsletter] = useState(false)
  const [regulations, setRegulations] = useState(false)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)


  useEffect(() => {
    const cookie = getCookie('user');

    if (cookie) {
      const loginFromCookie = cookie.split(';')[0];
      setLogin(loginFromCookie);
      setHasAccess(true);

      axios.get('https://platformaspedytor8-back-production.up.railway.app/customers')
        .then((response) => {
          const foundUser = response.data.find(customer => customer.login === loginFromCookie);
          setUser(foundUser);
        })
        .catch((err) => console.error('Error fetching customers:', err));
    } else {
      setHasAccess(false);
    }
  }, []);

  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
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




  function setCookie(name, value, days) {
  const expires = days
    ? "; expires=" + new Date(Date.now() + days * 864e5).toUTCString()
    : "";
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/`;
}

function deleteCookie(name) {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


  const handleSubmit = () => {
    setCustomerVisibilityEditForm(false)
    
axios.put(`https://platformaspedytor8-back-production.up.railway.app/customers/${editingId}`, {
  name, surname, street, postcode, city, email, login, password, newsletter, phonenumber, regulations
})
  .then((response) => {
    deleteCookie('user')
    setCookie('user', login + ';' + password, 30)
    // Pobierz zaktualizowanego użytkownika z serwera
    axios.get('https://platformaspedytor8-back-production.up.railway.app/customers')
      .then((res) => {
        const updatedUser = res.data.find(customer => customer._id === editingId);
        setUser(updatedUser); // zaktualizuj stan użytkownika na podstawie nowych danych
      })
      .catch(err => console.error("Błąd przy odświeżaniu danych użytkownika:", err));

    // Resetuj formularz i jego widoczność
    setCustomerVisibilityEditForm(false);
    setEditingId(0);
    setName('');
    setSurname('');
    setStreet('');
    setPostCode('');
    setCity('');
    setEmail('');
    setPassword('');
    setNewsletter(false);
    setPhoneNumber('');
    setRegulations(false);
  })
  .catch((err) => console.error("Błąd przy aktualizacji danych użytkownika:", err));
  }

  const handleEdit = (id, name, surname, street, postcode, city, email, login, password, newsletter, phonenumber, regulations) => {
    setEditingId(id)
    setName(name)
    setSurname(surname)
    setStreet(street)
    setPostCode(postcode)
    setCity(city)
    setEmail(email)
    setLogin(login)
    setPassword(password)
    setNewsletter(newsletter)
    setPhoneNumber(phonenumber)
    setRegulations(regulations)
    setCustomerVisibilityEditForm(true)





  }

  return (
    <div className="app">
      <Header />
      <div className="myProfile">
        {hasAccess ? (
          <>
            <h1>Profil ({login})</h1>


{customerVisibilityEditForm ? (
                           <form className="editMyProfileData" onSubmit={handleSubmit} style={{color: 'white', fontFamily: 'Verdana, sans-serif'}}>
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
            
            <button className="buttonToEdit">Zedytuj dane</button> </div>
        </form>
                    ) : null}





            {user ? (
              <div>
                <p><b>Imię:</b> {user.name}</p>
                <p><b>Nazwisko:</b> {user.surname}</p>
                <p><b>Adres zamieszkania:</b> ul.{user.street} {user.postcode} {user.city}</p>
                <p><b>E-mail:</b> {user.email}</p>
                <p><b>Login:</b> {user.login}</p>
                <p><b>Hasło:</b> {user.password}</p>
                <p><b>Zgoda na wysyłkę newslettera:</b> {user.newsletter ? 'tak' : 'nie'}</p>
                <p><b>Numer telefonu:</b> {user.phonenumber}</p>
                <p><b>Zgoda na regulamin serwisu:</b> {user.regulations ? 'tak' : 'nie'}</p>
                <p><b>Faktura:</b> {user.invoice ? 'tak' : 'nie'} </p>
                {user.invoice && (
                  <div>
                    <p><b>Nazwa firmy:</b> {user.companyname}</p>
                    <p><b>Adres firmy:</b> ul. {user.companystreet} {user.companypostcode} {user.companycity}</p>
                    <p><b>NIP:</b> {user.companynip}</p>
                    <p><b>REGON:</b> {user.companyregon}</p>
                  </div>
                )}
              </div>
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

export default MyProfile;
