import React from 'react'
import Header from './Header'
import Footer from './Footer'

const TermsAndConditions = () => {
    return (
        <div className="app">
        <Header/>
        <div className="privacyPolicy">
            <h1>Regulamin</h1>
            <br/><br/>
            <p>
               Terms and Conditions
            </p>
        </div>
        <Footer/>
        </div>
    )
}

export default TermsAndConditions
