import React from 'react'
import Header from './Header';
import Footer from './Footer';


const NotFound = () => {
    return(
       <div className="app">
        <Header/>
        <div className="fourhundredfour">
            <p>Błąd 404 - taka strona nie istnieje.</p>
        </div>
        <Footer/>
        </div>
    )
}

export default NotFound;