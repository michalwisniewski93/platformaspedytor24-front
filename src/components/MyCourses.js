import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const MyCourses = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [login, setLogin] = useState('');
  const [user, setUser] = useState(null);
  const [userAccesses, setUserAccesses] = useState([]);
  const [courses, setCourses] = useState([]); // wszystkie kursy

  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }

  useEffect(() => {
    const cookie = getCookie('user');

    if (cookie) {
      const loginFromCookie = cookie.split(';')[0];
      setLogin(loginFromCookie);
      setHasAccess(true);

      // Pobierz dane użytkownika
      axios.get('http://localhost:5000/customers')
        .then((response) => {
          const foundUser = response.data.find(customer => customer.login === loginFromCookie);
          if (foundUser) {
            setUser(foundUser);

            const rawAccesses = foundUser.accesses || '';
            const accessList = rawAccesses.split(/[\s;,]+/).filter(Boolean); // usuń puste wartości
            setUserAccesses(accessList);
          }
        })
        .catch((err) => console.error('Błąd podczas pobierania klientów:', err));

      // Pobierz listę kursów
      axios.get('http://localhost:5000/salessites')
        .then((response) => {
          setCourses(response.data);
        })
        .catch((err) => console.error('Błąd podczas pobierania kursów:', err));
    } else {
      setHasAccess(false);
    }
  }, []);

  // Kursy dostępne dla użytkownika
  const availableCourses = courses.filter(course =>
    userAccesses.includes(course.accesscode)
  );



  const handleDisplayMore = (id, numberoflessons, author, coursecontent, courselinks) => {

  }

  return (
    <div className="app">
      <Header />
      <div className="myCoursesPresentation">
        {hasAccess ? (
          <>
            <h1>Moje kursy ({availableCourses.length})</h1>

            {user ? (
              <>
                {availableCourses.length > 0 ? (
                  <div className="myCoursesList">
                    {availableCourses.map(course => (
                      <div className="myCoursesListItem">
                        <img src={`http://localhost:5000/${course.imageurl}`} alt={course.title} onClick={handleDisplayMore} />
                         <h1 onClick={handleDisplayMore}>{course.title}</h1>
                         <button onClick={() => handleDisplayMore(course._id, course.title, course.numberoflessons, course.author, course.coursecontent, course.courselinks)}>Oglądaj</button>
                        
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Brak dostępnych kursów.</p>
                )}
              </>
            ) : (
              <p>Ładowanie danych użytkownika...</p>
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

export default MyCourses;
