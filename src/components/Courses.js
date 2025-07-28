import React, {useEffect, useState} from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Courses = () => {
    const [courses, setCourses] = useState([])

     useEffect(() => {
        axios.get('https://platformaspedytor8-back.vercel.app/salessites')
        .then((response) => setCourses(response.data))
        .catch((err) => console.log('error fetching courses, error: ' + err))
    }, [])
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const changeCourseTitle = (title) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_TITLE', temporaryCourseTitle: title})
    const changeCourseImageUrl = (imageurl) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_IMAGE_URL', temporaryCourseImageUrl: imageurl})
    const changeCourseNumberOfLessons = (numberoflessons) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_NUMBER_OF_LESSONS', temporaryCourseNumberOfLessons: numberoflessons})
    const changeCoursePrice = (price) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_PRICE', temporaryCoursePrice: price})
    const changeCoursePriceBeforeThirtyDays = (pricebeforethirtydays) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_PRICE_BEFORE_THIRTY_DAYS', temporaryCoursePriceBeforeThirtyDays: pricebeforethirtydays})
    const changeCourseSalesContent = (salescontent) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_SALES_CONTENT', temporaryCourseSalesContent: salescontent})
    const changeCourseLinkToYoutube = (linktoyoutube) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_LINK_TO_YOUTUBE', temporaryCourseLinkToYoutube: linktoyoutube})
    const changeCourseContentList = (contentlist) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_CONTENT_LIST', temporaryCourseContentList: contentlist})
    const changeCourseAuthor = (author) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_AUTHOR', temporaryCourseAuthor: author})
    const changeCourseId  = (id) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_ID', temporaryCourseId: id})
    const changeCourseAccessCode = (accesscode) => dispatch({type: 'CHANGE_TEMPORARY_COURSE_ACCESS_CODE', temporaryCourseAccessCode: accesscode})





    const handleDisplayMore = (id, title, imageurl, numberoflessons, price, pricebeforethirtydays, salescontent, linktoyoutube, contentlist, author, accesscode) => {
        changeCourseId(id)
        changeCourseTitle(title)
        changeCourseImageUrl(imageurl)
        changeCourseNumberOfLessons(numberoflessons)
        changeCoursePrice(price)
        changeCoursePriceBeforeThirtyDays(pricebeforethirtydays)
        changeCourseSalesContent(salescontent)
        changeCourseLinkToYoutube(linktoyoutube)
        changeCourseContentList(contentlist)
        changeCourseAuthor(author)
        changeCourseAccessCode(accesscode)
        navigate('/kurs')
    }

    



    return (
        <div className="app">
                <Header/>
                <div className="courses">
                    <h1>Kursy z certyfikatem</h1>
                    <div className="coursesContent">
                        {courses.map(course => <div className="coursesContentItem" key={course._id}>
                         <img src={`https://platformaspedytor8-back.vercel.app${course.imageurl}`} alt={course.title} onClick={() => handleDisplayMore(course._id, course.title, course.imageurl, course.numberoflessons, course.price, course.pricebeforethirtydays, course.salescontent, course.linktoyoutube, course.contentlist, course.author, course.accesscode)} />
                         <h1 onClick={() => handleDisplayMore(course._id, course.title, course.imageurl, course.numberoflessons, course.price, course.pricebeforethirtydays, course.salescontent, course.linktoyoutube, course.contentlist, course.author, course.accesscode)}>{course.title}</h1>
                         <h4 onClick={() => handleDisplayMore(course._id, course.title, course.imageurl, course.numberoflessons, course.price, course.pricebeforethirtydays, course.salescontent, course.linktoyoutube, course.contentlist, course.author, course.accesscode)}>{course.price} zł</h4>
                         <button onClick={() => handleDisplayMore(course._id, course.title, course.imageurl, course.numberoflessons, course.price, course.pricebeforethirtydays, course.salescontent, course.linktoyoutube, course.contentlist, course.author, course.accesscode)}>Zobacz więcej</button>
                        </div>)}
                    </div>
                 </div>
                <Footer/>
        </div>
    )
}

export default Courses
