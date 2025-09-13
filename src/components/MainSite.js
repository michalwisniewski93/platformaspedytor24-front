import React from 'react'
import Header from './Header'
import HeroSlider from "./HeroSlider";
import AboutMeOnMainSite from './AboutMeOnMainSite';
import HeroContact from './HeroContact';
import Footer from './Footer';


const MainSite = () => {




    
    return (
         <div className="app">
          <Header/>
          <HeroSlider />
          <AboutMeOnMainSite/> 
          <HeroContact/>
          <Footer/>        
         </div>
    )
}
export default MainSite
