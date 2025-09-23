import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const NewUser = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [street, setStreet] = useState('');
    const [postcode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [invoice, setInvoice] = useState(false);
    const [companyname, setCompanyName] = useState('');
    const [companystreet, setCompanyStreet] = useState('');
    const [companypostcode, setCompanyPostCode] = useState('');
    const [companycity, setCompanyCity] = useState('');
    const [companyNip, setCompanyNip] = useState('');
    const [companyRegon, setCompanyRegon] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [regulations, setRegulations] = useState(false);

    const [customers, setCustomers] = useState([]);
    const [accesses, setAccesses] = useState('xyz, ');

    useEffect(() => {
        axios.get('https://platformaspedytor8-back-production.up.railway.app/customers')
            .then((response) => setCustomers(response.data))
            .catch((err) => console.log('error fetching customers, error: ' + err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Walidacja e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Podaj poprawny adres e-mail w formacie np. janek@spedytorszkolenia.pl');
            return;
        }

        // Walidacja numeru telefonu (9 cyfr)
        const phoneRegex = /^\d{9}$/;
        if (!phoneRegex.test(phonenumber)) {
            alert('Numer telefonu musi mieć 9 cyfr');
            return;
        }

        // Walidacja kodu pocztowego klienta (5 cyfr lub 2 cyfry - 3 cyfry)
        const postcodeRegex = /^\d{2}-?\d{3}$/;
        if (!postcodeRegex.test(postcode)) {
            alert('Kod pocztowy musi mieć format 85795 lub 85-795');
            return;
        }

        // Sprawdzenie, czy login już istnieje
        const loginExists = customers.some(customer => customer.login === login);
        if (loginExists) {
            alert(`Wybrałeś login: ${login}, taki login już istnieje w naszej bazie. Zmień go by założyć konto.`);
            return;
        }

        // Walidacja wymaganych pól
        if (name === '' || surname === '' || street === '' || postcode === '' || city === '' || email === '' || login === '' || password === '') {
            alert('Wszystkie pola formularza muszą być wypełnione');
            return;
        }

        if (!regulations) {
            alert('Nie zaakceptowałeś regulaminu');
            return;
        }

        // Walidacja pól firmowych (opcjonalnie)
        if (companyname !== '' || companystreet !== '' || companypostcode !== '' || companycity !== '' || companyNip !== '' || companyRegon !== '') {
            // Walidacja NIP (10 cyfr)
            const nipRegex = /^\d{10}$/;
            if (!nipRegex.test(companyNip)) {
                alert('NIP musi mieć 10 cyfr');
                return;
            }

            // Walidacja kodu pocztowego firmy
            if (!postcodeRegex.test(companypostcode)) {
                alert('Kod pocztowy firmy musi mieć format 85795 lub 85-795');
                return;
            }

            // REGON (opcjonalnie 9 cyfr)
            if (companyRegon === '') {
                setCompanyRegon('000000000');
            } else {
                const regonRegex = /^\d{9}$/;
                if (!regonRegex.test(companyRegon)) {
                    alert('REGON musi mieć 9 cyfr');
                    return;
                }
            }
        }

        const companynip = companyNip;
        const companyregon = companyRegon;

        // Wysyłanie danych
        axios.post("https://platformaspedytor8-back-production.up.railway.app/customers", {
            name, surname, street, postcode, city, companyname, companystreet, companypostcode, companycity,
            email, invoice, login, newsletter, password, phonenumber, regulations, companynip, companyregon, accesses
        })
            .then((response) => setCustomers([...customers, response.data]))
            .catch(err => {
                console.error('Error adding customers', err);
                alert('Uuups... coś poszło nie tak!');
            });

        alert('Założyłeś konto pomyślnie');

        // Reset formularza
        setName('');
        setSurname('');
        setStreet('');
        setPostCode('');
        setCity('');
        setEmail('');
        setInvoice(false);
        setLogin('');
        setNewsletter(false);
        setPassword('');
        setPhoneNumber('');
        setRegulations(false);
        setCompanyName('');
        setCompanyStreet('');
        setCompanyPostCode('');
        setCompanyCity('');
        setCompanyNip('');
        setCompanyRegon('');
        setAccesses('xyz, ');
        navigate("/");
    };

    const handleLoginChange = (e) => {
        const value = e.target.value;
        setLogin(value);

        if (value.includes(';')) {
            setError('Nie używaj średnika (;) w loginie');
        } else {
            setError('');
        }
    };

    return (
        <div className="app">
            <Header />
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
                            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                        </label>
                        <label>
                            Login:
                            <input type="text" pattern="^[^;]*$" title="Nie używaj średnika (;)" value={login} onChange={handleLoginChange} />
                        </label>
                        {error && <span style={{ color: 'red' }}>{error}</span>}
                        <label>
                            Hasło:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <label>
                            Nr telefonu:
                            <input type="text" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Adres (ulica, nr mieszkania/nr domu):
                            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
                        </label>
                        <label>
                            Kod pocztowy:<span className="additionalInfo">(5 cyfr lub 85-795)</span>
                            <input type="text" value={postcode} onChange={(e) => setPostCode(e.target.value)} />
                        </label>
                        <label>
                            Miejscowość:
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                        </label>
                        <label>
                            E-mail:
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>
                            Czy chcesz fakturę:
                            <input type="checkbox" checked={invoice} onChange={(e) => setInvoice(e.target.checked)} />
                        </label>
                    </div>
                    {invoice && (
                        <div>
                            <label>
                                Nazwa firmy (opcjonalnie):
                                <input type="text" value={companyname} onChange={(e) => setCompanyName(e.target.value)} />
                            </label>
                            <label>
                                Adres firmy (ulica):
                                <input type="text" value={companystreet} onChange={(e) => setCompanyStreet(e.target.value)} />
                            </label>
                            <label>
                                Kod pocztowy firmy: (5 cyfr lub 85-795)
                                <input type="text" value={companypostcode} onChange={(e) => setCompanyPostCode(e.target.value)} />
                            </label>
                            <label>
                                Miejscowość firmy:
                                <input type="text" value={companycity} onChange={(e) => setCompanyCity(e.target.value)} />
                            </label>
                            <label>
                                NIP (10 cyfr):
                                <input type="text" maxLength="10" minLength="10" value={companyNip} onChange={(e) => setCompanyNip(e.target.value)} />
                            </label>
                            <label>
                                REGON (opcjonalnie, 9 cyfr):
                                <input type="text" maxLength="9" minLength="9" value={companyRegon} onChange={(e) => setCompanyRegon(e.target.value)} />
                            </label>
                        </div>
                    )}
                    <div>
                        <label>
                            Newsletter:
                            <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
                        </label>
                        <label>
                            Akceptacja regulaminu sklepu (<a href="/regulamin" target="_blank" rel="noopener noreferrer">Regulamin sklepu</a>):
                            <input type="checkbox" checked={regulations} onChange={(e) => setRegulations(e.target.checked)} />
                        </label>
                        <button type="submit">Załóż konto</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default NewUser;
