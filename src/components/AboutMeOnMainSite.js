import React from 'react'
import photo from '../images/businessman.png'


const AboutMeOnMainSite = () => {
    return (
        <>
        <div className="aboutMe">
            <div className="aboutMeDescription">
                <p>
                     Witaj!<br/><br/>
     Nazywam się Radosław Wiśniewski. Od 10 lat jestem aktywnym spedytorem krajowym i międzynarodowym.<br/>
     Studiowałem o zgrozo teleinformatykę {"\u{1F605}"}, ale po studiach mój znajomy zainteresował mnie branżą TSL. <br/>
     I tak się wciągnąłem w branżę że jestem w niej jak już wspomniałem od dekady.<br/>
     Zaczynałem od spedycji krajowej awansując na spedytora międzynarodowego. Zajmowałem się zarówno sprzedażą w spedycji jak 
     i całą organizacją transportów.<br/>
     Odkryłem wielką pasję w branży TSL.  {"\u{1F49C}"}<br/>
     Obecnie jestem managerem w firmie transportowej.<br/><br/>
     W 2021 moją wielką pasję do spedycji postanowiłem rozszerzyć szkoląc innych - tak narodziła się platforma <strong>SpedytorSzkolenia.pl</strong>
        {"\u{1F9E0}"}<br/><br/>
     Kursy tworzę z myślą o osobach zarówno początkujących jak i profesjonalistach szukających praktycznej wiedzy w atrakcyjnym wydaniu.
     Na platformie znajdziesz rzetelne materiały, konkretne wskazówki oraz treści oparte na rzeczywistych doświadczeniach z codziennej pracy w spedycji i transporcie.
<br/><br/>
    Jeśli chcesz zdobywać praktyczną wiedzę i lepiej zrozumieć branżę TSL – jesteś we właściwym miejscu.
<br/>
    Zaczynamy? {"\u{1F91D}"}
                </p>
            </div>
  <div className="aboutMeHeroPhoto">
              <img src={photo}  alt="zdjęcie prowadzącego kursy" />
  </div>
        </div>
        </>
    )
}

export default AboutMeOnMainSite
