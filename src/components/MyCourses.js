import React, { useState, useEffect } from 'react';
import http from '../api/http';
import Header from './Header';
import Footer from './Footer';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {SERVER_URL} from "../consts";

const MyCourses = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [login, setLogin] = useState('');
  const [user, setUser] = useState(null);
  const [userAccesses, setUserAccesses] = useState([]);
  const [courses, setCourses] = useState([]); 

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const changeCourseViewId = (id) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_VIEW_ID', temporaryCourseViewId: id})
  const changeCourseViewTitle = (title) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_VIEW_TITLE', temporaryCourseViewTitle: title})
  const changeCourseViewNumberOfLessons = (numberoflessons) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_VIEW_NUMBER_OF_LESSONS', temporaryCourseViewNumberOfLessons: numberoflessons})
  const changeCourseViewAuthor = (author) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_VIEW_AUTHOR', temporaryCourseViewAuthor: author})
  const changeCourseViewCourseContent = (coursecontent) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_VIEW_COURSE_CONTENT', temporaryCourseViewCourseContent: coursecontent})
  const changeCourseViewCourseLinks = (courselinks) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_VIEW_COURSE_LINKS', temporaryCourseViewCourseLinks: courselinks})
  


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
      http.get(`${SERVER_URL}/customers`)
        .then((response) => {
          const foundUser = response.data.find(customer => customer.login === loginFromCookie);
          if (foundUser) {
            setUser(foundUser);

            const rawAccesses = foundUser.accesses || '';
            const accessList = rawAccesses.split(/[\s;,]+/).filter(Boolean); 
            setUserAccesses(accessList);
          }
        })
        .catch((err) => console.error('Błąd podczas pobierania klientów:', err));

      // Pobierz listę kursów
      http.get(`${SERVER_URL}/salessites`)
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



  const handleDisplayMore = (id, title, numberoflessons, author, coursecontent, courselinks) => {
    
  changeCourseViewId(id)
  changeCourseViewNumberOfLessons(numberoflessons)
  changeCourseViewTitle(title)
  changeCourseViewAuthor(author)
  changeCourseViewCourseContent(coursecontent)
  changeCourseViewCourseLinks(courselinks)
  navigate('/widok-kursu')
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
                        <img src={`${SERVER_URL}/${course.imageurl}`} alt={course.title} onClick={() => handleDisplayMore(course._id, course.title, course.numberoflessons, course.author, course.coursecontent, course.courselinks)} />
                         <h1 onClick={() => handleDisplayMore(course._id, course.title, course.numberoflessons, course.author, course.coursecontent, course.courselinks)}>{course.title}</h1>
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
