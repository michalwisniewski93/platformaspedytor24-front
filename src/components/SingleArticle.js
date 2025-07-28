import React, {useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'

import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'


const SingleArticle = () => {



   
const title = useSelector(state => state.temporaryBlogTitle)
const imageurl = useSelector(state => state.temporaryBlogImageUrl)
const author = useSelector(state => state.temporaryBlogAuthor)
const description = useSelector(state => state.temporaryBlogDescription)

const navigate = useNavigate()

useEffect(() => {
    if(title === '' || imageurl === '' || author === '' || description === ''){
        navigate('/blog')
    }
}, [])


    return (
        <div className="app">
                <Header/>
                <div className="blogExpert">
                    <h1>{title}</h1>
                    <h6>autor artykułu: {author}</h6>
                    <img  style={{ margin: '0 auto', display: 'block' }} src={`https://platformaspedytor8-back-production.up.railway.app/${imageurl}`} alt={title} />
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                    
                 </div>
                <Footer/>
        </div>
    )
}

export default SingleArticle
