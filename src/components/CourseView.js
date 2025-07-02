import React, {useState, useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CourseView = () => {

    const [hasAccess, setHasAccess] = useState(false)


    const id = useSelector(state => state.temporaryCourseViewId)
    const numberoflessons = useSelector(state => state.temporaryCourseViewNumberOfLessons)
    const title = useSelector(state => state.temporaryCourseViewTitle)
    const author = useSelector(state => state.temporaryCourseViewAuthor)
    const coursecontent = useSelector(state => state.temporaryCourseViewCourseContent)
    const courselinks = useSelector(state => state.temporaryCourseViewCourseLinks)

    const navigate = useNavigate()


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
      
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
  }, []);


  useEffect(() => {
    if(id === '' || title === '' || numberoflessons === '' || author === '' || coursecontent === '' || courselinks === ''){
      navigate('/moje-kursy')
    }
  }, [])


    return(
        <div className="app">
        <Header/>
        {hasAccess ? (
          <>
            
            <div className="courseViewPresentation">
            <h1>{title} - {author}</h1>
            <h1>liczba lekcji: {numberoflessons}</h1>
            <div className="courseViewPresentationWrapper">
              <div className="courseViewPresentationCourseContent" dangerouslySetInnerHTML={{ __html: coursecontent }} />
              <div className="courseViewPresentationCourseLinks" dangerouslySetInnerHTML={{ __html: courselinks }} />
            </div>
            
            </div>
          </>
        ): (
             <div className="courseViewPresentation">
            <h1>Nie masz dostępu</h1>
        </div>
        )}
        
        <Footer/>
        </div>
    )
}

export default CourseView;