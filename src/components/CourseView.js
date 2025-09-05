import React, {useState, useEffect} from 'react'
import { FaTruck } from 'react-icons/fa'
import Header from './Header'
import Footer from './Footer'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CourseView = () => {
const [showH3Communicate, setShowH3Communicate] = useState(true);
    const [hasAccess, setHasAccess] = useState(false)
    const [isViewCert, setIsViewCert] = useState(false)
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState([])
    const [taxdatas, setTaxDatas] = useState([])
    const [dots, setDots] = useState("");


    const id = useSelector(state => state.temporaryCourseViewId)
    const numberoflessons = useSelector(state => state.temporaryCourseViewNumberOfLessons)
    const title = useSelector(state => state.temporaryCourseViewTitle)
    const author = useSelector(state => state.temporaryCourseViewAuthor)
    const coursecontent = useSelector(state => state.temporaryCourseViewCourseContent)
    const courselinks = useSelector(state => state.temporaryCourseViewCourseLinks)

    const navigate = useNavigate()


      function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }



 useEffect(() => {
  if (!hasAccess) return;

  setShowH3Communicate(true); // pokaż komunikat od razu

  // timer ukrywania komunikatu po 2 minutach
  const timer = setTimeout(() => {
    setShowH3Communicate(false);
  }, 120000);

  // animacja kropek
  const interval = setInterval(() => {
    setDots(prev => (prev.length < 3 ? prev + "." : ""));
  }, 1000);

  // sprzątanie po odmontowaniu lub zmianie stanu
  return () => {
    clearTimeout(timer);
    clearInterval(interval);
  };
}, [hasAccess]);


 

useEffect(() => {
    axios.get('https://platformaspedytor8-back-production.up.railway.app/taxdatas')
        .then((response) => {
          setTaxDatas(response.data);
        })
        .catch((err) => console.error('Błąd podczas pobierania danych firmy sprzedawcy:', err));
}, [])



  useEffect(() => {
    const cookie = getCookie('user');

    if (cookie) {
      const loginFromCookie = cookie.split(';')[0];
      
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }


   axios.get('https://platformaspedytor8-back-production.up.railway.app/customers')
  .then((response) => {
    setCustomers(response.data);
    const loginFromCookie = getCookie('user')?.split(';')[0];
    const foundCustomer = response.data.find(customer => customer.login === loginFromCookie);
    if (foundCustomer) setCustomer(foundCustomer);
  })
  .catch((err) => console.error('Błąd podczas pobierania klientów:', err));


  }, []);


  useEffect(() => {
    if(id === '' || title === '' || numberoflessons === '' || author === '' || coursecontent === '' || courselinks === ''){
      navigate('/moje-kursy')
    }
  }, [])

  const generateCert = () => {
    setIsViewCert(!isViewCert)
  }

const printCert = () => {
  const certElement = document.querySelector('.certContent');
  if (!certElement) return;

  const printWindow = window.open('', '_blank', 'width=1024,height=1536');
  if (!printWindow) return;

  // Skopiuj wszystkie <style> i <link> z dokumentu źródłowego
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((node) => node.outerHTML)
    .join('\n');

  // Wstaw czcionkę Funnel Display – PODMIENI NA SWOJE ŹRÓDŁO JEŚLI LOKALNE
  const funnelFontImport = `
    <style>
      @font-face {
        font-family: 'Funnel Display';
        src: url('/fonts/FunnelDisplay-Regular.woff2') format('woff2'),
             url('/fonts/FunnelDisplay-Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }

      .certContent {
        font-family: 'Funnel Display', sans-serif;
      }
    </style>
  `;

  // Wydrukuj z zachowaniem stylów
  printWindow.document.write(`
    <html>
      <head>
        <title>Certyfikat</title>
        ${styles}
        ${funnelFontImport}
        <style>
          @media print {
            @page {
              size: 1024px 1536px;
              margin: 0;
            }
            html, body {
              margin: 0;
              padding: 0;
              width: 1024px;
              height: 1536px;
            }
            .certContent {
              page-break-inside: avoid;
            }
          }

          html, body {
            background: white;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        ${certElement.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };
};





  function getPolishDateString() {
  const miesiące = [
    "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
    "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
  ];

  const teraz = new Date();
  const dzień = teraz.getDate();
  const miesiąc = miesiące[teraz.getMonth()];
  const rok = teraz.getFullYear();

  return `${dzień} ${miesiąc} ${rok}r.`;
}


function getCertificateNumber() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lettersAndDigits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // Pierwszy znak - zawsze litera
  const firstChar = letters[Math.floor(Math.random() * letters.length)];

  // Pozostałe 9 znaków - litery lub cyfry
  let remaining = '';
  for (let i = 0; i < 9; i++) {
    remaining += lettersAndDigits[Math.floor(Math.random() * lettersAndDigits.length)];
  }

  return firstChar + remaining;
}



 useEffect(() => {
    if(title === ''){
      navigate('/moje-kursy')
    }
  }, [])


    return(
        <div className="app">
        <Header/>
        {hasAccess ? (
          <>
            
            <div className="courseViewPresentation">
            <h1>{title} - {author}</h1>
            <h1>liczba lekcji: {numberoflessons}</h1>
        
        
            {hasAccess && showH3Communicate && (
  <h3 className="adminInfo1">Ładowanie plików Video {dots}<br/> Aby oglądać filmy w najwyższej jakości - odtwórz film a następnie kliknij ikonkę ⚙️ a następnie wybierz quality (jakość) i ustaw na 1020p HD. <br/>Aby wygenerować certyfikat zjedź na dół strony pojawi się opcja wygenerowania certyfikatu.</h3>
)}
   

             
            <div className="courseViewPresentationWrapper">
              <div className="courseViewPresentationCourseContent" dangerouslySetInnerHTML={{ __html: coursecontent }} />
              <div className="courseViewPresentationCourseLinks" dangerouslySetInnerHTML={{ __html: courselinks }} />
            </div>
            <h1>Skończyłeś kurs? Wygeneruj nowy certyfikat.</h1>
            <button className="buttonToEdit" onClick={generateCert}>{isViewCert ? 'Schowaj' : 'Wygeneruj nowy'} certyfikat</button>
            {isViewCert ? (<button className="buttonToEdit" onClick={printCert}>Wydrukuj wygenerowany certyfikat</button>) : null}
            {isViewCert ? (
              <div className="certContent">
                <h1 className="certHero">CERTYFIKAT</h1>
                <h2 className="success1">Ukończenia kursu</h2>
                <h2 className="success2">Zaświadczamy że</h2>
                <h1 className="userofcert">{customer.name} {customer.surname}</h1>
                <h2 className="success3">ukończył(a) z sukcesem</h2>
                <h1 className="title">kurs {title}</h1>
                <div className="footercert">
                  <div className="footer1">
                    <h3 className="dateandcity">wystawiono: <br/> {getPolishDateString()} {taxdatas[0]?.sellercompanycity || ''}</h3>
                    <h4 className="certnumber">certyfikat nr: {getCertificateNumber()}</h4>
                   
                  </div>
                  <div className="footer2">
                    <h3 className="signature">{author} - prowadzący kurs, właściciel platformy spedytorszkolenia.pl</h3>
                  </div>
                </div>
                <div className="footerlogo">
                   <h1 className="logotype"><FaTruck size={60}  style={{ verticalAlign: 'middle' }}/> spedytorszkolenia.pl</h1>
                </div>
                
                
              </div>
              ) : null }
            </div>
          </>
        ): (
             <div className="courseViewPresentation">
            <h1>Nie masz dostępu</h1>
        </div>
        )}
        
        <Footer/>
        </div>
    )
}

export default CourseView;
