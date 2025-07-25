import React, {useEffect, useState} from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Blog = () => {
    const [articles, setArticles] = useState([])

     useEffect(() => {
        axios.get('https://platformaspedytor8-back.vercel.app/articles')
        .then((response) => setArticles(response.data))
        .catch((err) => console.log('error fetching articles, error: ' + err))
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const changeImageUrl = (imageurl) => dispatch({type: 'CHANGE_TEMPORARY_BLOG_IMAGE_URL', temporaryBlogImageUrl: imageurl})
    const changeTitle = (title) => dispatch({type: 'CHANGE_TEMPORARY_BLOG_TITLE', temporaryBlogTitle: title})
    const changeDescription = (description) => dispatch({type: 'CHANGE_TEMPORARY_BLOG_DESCRIPTION', temporaryBlogDescription: description})
    const changeAuthor = (author) => dispatch({type: 'CHANGE_TEMPORARY_BLOG_AUTHOR', temporaryBlogAuthor: author})

    const handleShowArticle = (imageurl, title, description, author) => {
        changeImageUrl(imageurl)
        changeTitle(title)
        changeDescription(description)
        changeAuthor(author)
        navigate('/single-article')

    }


    return (
        <div className="app">
                <Header/>
                <div className="blogExpert">
                    <h1>Blog</h1>
                    <div className="blogExpertContent">
                        {articles.map(article => <div className="blogExpertContentItem" key={article._id}>
                         <img src={`https://platformaspedytor8-back.vercel.app/${article.imageurl}`} alt={article.title} />
                         <h1>{article.title}</h1>
                         <h4>autor: {article.author}</h4>
                         <button onClick={() => handleShowArticle(article.imageurl, article.title, article.description, article.author)}>Czytaj więcej ...</button>
                        </div>).reverse()}

                    </div>
                 </div>
                <Footer/>
        </div>
    )
}

export default Blog