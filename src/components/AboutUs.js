import React, {useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'

const AboutUs = () => {

useEffect(() => {
    document.title = 'Michał Wiśniewski - spedytorszkolenia.pl'

    return () => {
      document.title = 'Kursy spedytora online z Certyfikatem'; // 👈 oryginalny tytuł
    };
}, [])

    return (
        <div className="app">
                <Header/>
                <div className="aboutOurPlatform">
                    <h1>O naszej platformie</h1>
                    <h3>SpedytorSzkolenia.pl - praktyczna, konkretna dawka wiedzy, bez zbędnego teoretyzowania!</h3>
                    <br/><br/>


                    <h3>Cześć, tu Michał z spedytorszkolenia.pl {String.fromCodePoint(0x1F600)}</h3> <br/>
Jesteś tutaj by nauczyć się zawodu spedytora. Celem platformy jest przedstawienie Tobie praktycznych i teoretycznych
zagadnień, które przydadzą Ci się w codziennej pracy spedytora.<br/> Po odbytych kursach możesz śmiało aplikować
do pracy jako spedytor! {String.fromCodePoint(0x1F4BC)}<br/><br/>

<b>Uczę tak jak sam chciałbym być uczony</b> - to moje motto. {String.fromCodePoint(0x1F4A1)}<br/><br/>
 Kursy przygotowane zostały w uporządkowanej i praktycznej formie.
Każde zagadnienie omawiane jest na przykładach z życia tak abyś mógł sobie to wyobrazić i łatwo przyswoić.<br/><br/>

<b>Szkolenia zawierają tylko wartościową wiedzę która pozwoli Ci zarabiać pieniądze.</b><br/><br/>

Kursy zostały przygotowane w taki sposób abyś mógł zostać spedytorem w ciągu 30 - 40 dni, nawet jeżeli jesteś początkujący i zielony w temacie. Wszystko oczywiście zależy od twojego zaangażowania w naukę,
ale około miesiąc to optymalny czas w którym każdy jest w stanie przyswoić podaną przeze mnie wiedzę.{String.fromCodePoint(0x1F552)}
<br /><br />
{String.fromCodePoint(0x274C)} Rynek szkoleń TSL niestety zawiera często nieaktualną wiedzę - na naszej platformie jest zupełnie inaczej, stale
aktualizujemy nasze kursy, tak abyś uczył się tego co dzisiaj jest wymagane w branży.
<br /> <br />

<b>{String.fromCodePoint(0x2705)} Czy wiesz, co jest priorytetem w pracy spedytora?</b> <br />
Aktualna i rzetelna wiedza którą zdobędziesz od fachowca z 10 letnim doświadczeniem w branży.{String.fromCodePoint(0x1F9E0)} <br />
<b>{String.fromCodePoint(0x2705)} Czy potrafisz pozyskiwać nowych kontrachentów?</b> <br />
Tego również Cię nauczę, pokażę Ci narzędzia które pomagają w prosty sposób pozyskać nowych klientów.
Nauczę Cię budować relacje z klientami. <br />
<b>{String.fromCodePoint(0x2705)} Pokażę Ci środki transportowe i ich zastosowanie. </b><br />
<b>{String.fromCodePoint(0x2705)} Przejdziemy przez wszystkie aspekty od A do Z które będą Ci potrzebne w pracy spedytora. </b><br />
<b>{String.fromCodePoint(0x2705)} Nauczę Cię jak organizować transport, jak szukać klientów na własną rękę, jak obsługiwać giełdę transportową. </b><br />
<br />

<b>Korzyści dla Ciebie </b> <br />
{String.fromCodePoint(0x2705)} Aktualna wiedza fachowca - stawiam na praktykę i uczenie w prosty, zrozumiały sposób <br />
{String.fromCodePoint(0x2705)} Otrzymasz wiedzę która będzie jak rok doświadczenia na stanowisku spedytora - jeżeli pochwalisz się nią na rozmowie kwalifikacyjnej
twój rekruter będzie oczarowany. {String.fromCodePoint(0x1F4BC)}<br />
{String.fromCodePoint(0x2705)} Korzystna cena - inwestujesz w swoją karierę i ten wkład zwróci Ci się wielokrotnie jeśli podejmiesz pracę zawodową
<br /> <br />

<b>Jesteś gotowy? {String.fromCodePoint(0x1F680)} Zamów już teraz kursy które odmienią twoją karierę i twoje życie na lepsze. {String.fromCodePoint(0x1F525)} {String.fromCodePoint(0x1F44F)} {String.fromCodePoint(0x1F4AA)}</b>
            
                </div>
                <Footer/>
                </div>
    )
}

export default AboutUs