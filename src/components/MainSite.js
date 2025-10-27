import React, {useEffect} from 'react'
import Header from './Header'
import HeroSlider from "./HeroSlider";
import AboutMeOnMainSite from './AboutMeOnMainSite';
import HeroContact from './HeroContact';
import Footer from './Footer';
import {SERVER_URL} from "../consts";


const MainSite = () => {

useEffect(() => {
    const referrer = document.referrer.toLowerCase();
    let source = null;
    console.log("Referrer:", referrer);

    if (referrer.includes("google")) source = "Google";
    else if (referrer.includes("youtube")) source = "YouTube";
    else if (referrer.includes("tiktok")) source = "TikTok";
    else if (referrer.includes("instagram")) source = "Instagram";
    else if (referrer.includes("facebook")) source = "Facebook";

    if (source) {
      fetch(`${SERVER_URL}/api/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source }),
        keepalive: true
      });
    }
  }, []);


    
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
