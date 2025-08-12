import React from 'react'
import Header from './Header'
import Footer from './Footer'

const ProductsAndPricing = () => {
    return (
        <div className="app">
        <Header/>
        <div className="privacyPolicy">
            <h1>Products and Pricing</h1>
            <br/><br/>
            <p>
               <strong>OD ZERA DO SPEDYTORA  - kurs zawodu spedytora od podstaw do poziomu zaawansowanego  (szkolenie z certyfikatem) </strong>– 219 pln<br/><br/> 

<strong>SZKOŁA KONTAKTÓW I SPRZEDAŻY W SPEDYCJI – naucz się sprzedawać i zarabiać w branży spedycyjnej (szkolenie z certyfikatem) </strong>– 219 pln<br/><br/> 

<strong>ZLECENIE SPEDYCYJNE KROK PO KROKU – od klienta do realizacji (szkolenie z certyfikatem) </strong>– 159 pln<br/> 
            </p>
        </div>
        <Footer/>
        </div>
    )
}

export default ProductsAndPricing
