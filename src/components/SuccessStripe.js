import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import http from '../api/http';

const SuccessStripe = () => {
  const navigate = useNavigate();

  // Pobieranie ciasteczka po nazwie
  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }

  // Usuwanie ciasteczka
  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  useEffect(() => {
    const assignAccesses = async () => {
      try {
        const foundUser = getCookie('user');
        if (!foundUser) {
          console.log('nie znaleziono usera dlatego przekierowano');
          navigate('/', { replace: true });
          return;
        }

        // Pobranie listy klientów
        const customersRes = await http.get('/customers');
        const myUser = customersRes.data.find(c => c.login === foundUser);

        if (!myUser) {
          console.log('nie znaleziono my usera dlatego przekierowano');
          navigate('/', { replace: true });
          return;
        }

        // Zaktualizowanie dostępu
        const newAccesses = getCookie('newaccesses') || '';
        const accessesArray = [
          ...(myUser.accesses ? myUser.accesses.split(';') : []),
          ...(newAccesses ? newAccesses.split(';') : []),
        ];
        const finalAccesses = accessesArray.filter(Boolean).join(';');

        await http.put(`/customers/${myUser._id}`, { accesses: finalAccesses });

        // Wyczyszczenie cookie z tymczasowych danych
        deleteCookie('newaccesses');
      } catch (err) {
        console.error('Błąd przy przydzielaniu dostępu:', err);
        navigate('/', { replace: true });
      }
    };

    assignAccesses();
  }, [navigate]);

  return (
    <div className="greatSuccess" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🎉 Dostęp do kursów został przyznany!</h1>
      <p>
        <Link to="/moje-kursy">Przejdź do Moje kursy</Link>
      </p>
    </div>
  );
};

export default SuccessStripe;

