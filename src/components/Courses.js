import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import http from '../api/http';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {SERVER_URL} from "../consts";

// 🔹 komponent do obsługi WebP -> JPG fallback
function supportsWebP() {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve(img.width > 0 && img.height > 0)
    img.onerror = () => resolve(false)
    img.src =
      'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEALwA=' // tiny webp
  })
}

const SmartImage = ({ srcWebp, alt, className, onClick }) => {
  const [src, setSrc] = useState(srcWebp)

  useEffect(() => {
    supportsWebP().then(supported => {
      if (!supported) {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = srcWebp
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0)
          const jpgUrl = canvas.toDataURL('image/jpeg', 0.9)
          setSrc(jpgUrl)
        }
      }
    })
  }, [srcWebp])

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onClick={onClick}
    />
  )
}

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    http
      .get(`${SERVER_URL}/salessites`)
      .then(response => {
        setCourses(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.log('error fetching courses, error: ' + err)
        setLoading(false)
      })
  }, [])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const changeCourseTitle = title =>
    dispatch({
      type: 'CHANGE_TEMPORARY_COURSE_TITLE',
      temporaryCourseTitle: title,
    })
  const changeCourseImageUrl = imageurl =>
    dispatch({
      type: 'CHANGE_TEMPORARY_COURSE_IMAGE_URL',
      temporaryCourseImageUrl: imageurl,
    })
  const changeCourseNumberOfLessons = numberoflessons =>
    dispatch({
      type: 'CHANGE_TEMPORARY_COURSE_NUMBER_OF_LESSONS',
      temporaryCourseNumberOfLessons: numberoflessons,
    })
  const changeCoursePrice = price =>
    dispatch({
      type: 'CHANGE_TEMPORARY_COURSE_PRICE',
      temporaryCoursePrice: price,
    })
  const changeCoursePriceBeforeThirtyDays = pricebeforethirtydays =>
    dispatch({
      type: 'CHANGE_TEMPORARY_COURSE_PRICE_BEFORE_THIRTY_DAYS',
      temporaryCoursePriceBeforeThirtyDays: pricebeforethirtydays,
    })
  const changeCourseSalesContent = salescontent =>
    dispatch({
      type: 'CHANGE_TEMPORARY_COURSE_SALES_CONTENT',
      temporaryCourseSalesContent: salescontent,
    })
  const changeCourseLinkToYoutube = linktoyoutube =>
    dispatch({
      type: 'CHANGE_TEMPORARY_COURSE_LINK_TO_YOUTUBE',
      temporaryCourseLinkToYoutube: linktoyoutube,
    })
  const changeCourseContentList = contentlist =>
    dispatch({
      type: 'CHANGE_TEMPORARY_COURSE_CONTENT_LIST',
      temporaryCourseContentList: contentlist,
    })
  const changeCourseAuthor = author =>
    dispatch({
      type: 'CHANGE_TEMPORARY_COURSE_AUTHOR',
      temporaryCourseAuthor: author,
    })
  const changeCourseId = id =>
    dispatch({
      type: 'CHANGE_TEMPORARY_COURSE_ID',
      temporaryCourseId: id,
    })
  const changeCourseAccessCode = accesscode =>
    dispatch({
      type: 'CHANGE_TEMPORARY_COURSE_ACCESS_CODE',
      temporaryCourseAccessCode: accesscode,
    })

  const handleDisplayMore = (
    id,
    title,
    imageurl,
    numberoflessons,
    price,
    pricebeforethirtydays,
    salescontent,
    linktoyoutube,
    contentlist,
    author,
    accesscode
  ) => {
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
      <Header />
      <div className="courses">
        <h1>Kursy z certyfikatem</h1>
        <div className="coursesContent">
          {loading ? (
            <p>Ładowanie kursów...</p>
          ) : (
            courses.map(course => (
              <div className="coursesContentItem" key={course._id}>
                <SmartImage
                  srcWebp={`${SERVER_URL}${course.imageurl}`}
                  alt={course.title}
                  className="courseImage"
                  onClick={() =>
                    handleDisplayMore(
                      course._id,
                      course.title,
                      course.imageurl,
                      course.numberoflessons,
                      course.price,
                      course.pricebeforethirtydays,
                      course.salescontent,
                      course.linktoyoutube,
                      course.contentlist,
                      course.author,
                      course.accesscode
                    )
                  }
                />
                <h1
                  className="courseTitleHero"
                  onClick={() =>
                    handleDisplayMore(
                      course._id,
                      course.title,
                      course.imageurl,
                      course.numberoflessons,
                      course.price,
                      course.pricebeforethirtydays,
                      course.salescontent,
                      course.linktoyoutube,
                      course.contentlist,
                      course.author,
                      course.accesscode
                    )
                  }
                >
                  {course.title}
                </h1>
                <h4
                  onClick={() =>
                    handleDisplayMore(
                      course._id,
                      course.title,
                      course.imageurl,
                      course.numberoflessons,
                      course.price,
                      course.pricebeforethirtydays,
                      course.salescontent,
                      course.linktoyoutube,
                      course.contentlist,
                      course.author,
                      course.accesscode
                    )
                  }
                >
                  {course.price} zł
                </h4>
                <button
                  onClick={() =>
                    handleDisplayMore(
                      course._id,
                      course.title,
                      course.imageurl,
                      course.numberoflessons,
                      course.price,
                      course.pricebeforethirtydays,
                      course.salescontent,
                      course.linktoyoutube,
                      course.contentlist,
                      course.author,
                      course.accesscode
                    )
                  }
                >
                  Zobacz więcej
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Courses
