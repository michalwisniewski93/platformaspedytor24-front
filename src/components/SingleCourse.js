import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CommentsWidget from './CommentsWidget';
import {SERVER_URL} from "../consts";

const SingleCourse = () => {
  const title = useSelector(state => state.temporaryCourseTitle);
  const imageurl = useSelector(state => state.temporaryCourseImageUrl);
  const numberoflessons = useSelector(state => state.temporaryCourseNumberOfLessons);
  const price = useSelector(state => state.temporaryCoursePrice);
  const pricebeforethirtydays = useSelector(state => state.temporaryCoursePriceBeforeThirtyDays);
  const salescontent = useSelector(state => state.temporaryCourseSalesContent);
  const linktoyoutube = useSelector(state => state.temporaryCourseLinkToYoutube);
  const contentlist = useSelector(state => state.temporaryCourseContentList);
  const author = useSelector(state => state.temporaryCourseAuthor);
  const id = useSelector(state => state.temporaryCourseId);
  const accesscode = useSelector(state => state.temporaryCourseAccessCode)
  const [temporaryBasket, setTemporaryBasket] = useState([]);

  const navigate = useNavigate();

  // Odczyt i synchronizacja koszyka z localStorage
  useEffect(() => {
  const storedBasket = localStorage.getItem('basket');
  if (storedBasket) {
    try {
      setTemporaryBasket(JSON.parse(storedBasket));
    } catch (err) {
      console.error('Nieprawidłowy JSON w localStorage:', err);
      setTemporaryBasket([]);
    }
  }

  const handleStorageChange = (event) => {
    if (event.key === 'basket') {
      try {
        const newBasket = event.newValue ? JSON.parse(event.newValue) : [];
        setTemporaryBasket(newBasket);
      } catch (err) {
        console.error('Błąd przy parsowaniu koszyka z localStorage:', err);
        setTemporaryBasket([]);
      }
    }
  };

  window.addEventListener('storage', handleStorageChange);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}, []);


  useEffect(() => {
    if (
      title === '' ||
      imageurl === '' ||
      numberoflessons === '' ||
      price === 0 ||
      price === '' ||
      pricebeforethirtydays === 0 ||
      pricebeforethirtydays === '' ||
      salescontent === '' ||
      linktoyoutube === '' ||
      contentlist === '' ||
      author === '' ||
      accesscode === ''
    ) {
      navigate('/kursy');
    }
  }, [title, imageurl, numberoflessons, price, pricebeforethirtydays, salescontent, linktoyoutube, contentlist, author, accesscode, navigate]);

  const handleBuyNow = (id, title, author, price, imageurl, accesscode) => {
    const isAlreadyInBasket = temporaryBasket.some(item => item.id === id);
  if (isAlreadyInBasket) {
    alert('Ten kurs jest już w koszyku!');
    navigate('/basket')
    return;
  }
    const helperObject = {
      id,
      title,
      author,
      price,
      imageurl,
      accesscode
    };

    const updatedBasket = [...temporaryBasket, helperObject];

    setTemporaryBasket(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    navigate('/basket')
  };

  const handleAddToBasket = (id, title, author, price, imageurl, accesscode) => {

    const isAlreadyInBasket = temporaryBasket.some(item => item.id === id);
  if (isAlreadyInBasket) {
    alert('Ten kurs jest już w koszyku!');
    return;
  }
    const helperObject = {
      id,
      title,
      author,
      price,
      imageurl,
      accesscode
    };

    

    const updatedBasket = [...temporaryBasket, helperObject];
    setTemporaryBasket(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
  };

  return (
    <div className="app">
      <Header />
      <div className="singleProductPresentation">
        <div className="topProductPresentation">
          <div className="productPresentationImage">
            <img src={`${SERVER_URL}${imageurl}`} alt={title} />
          </div>
          <div className="productPresentationPrimaryData">
            <h2>{title}</h2>
            <h5>
              liczba lekcji: {numberoflessons} autor: {author}
            </h5>
            <button onClick={() => handleBuyNow(id, title, author, price, imageurl, accesscode)}>
              Kup teraz {price} zł
            </button>
            <button onClick={() => handleAddToBasket(id, title, author, price, imageurl, accesscode)}>Dodaj do koszyka</button>
            <h5>Najniższa cena w ostatnich 30 dniach: {pricebeforethirtydays} zł</h5>
          </div>
        </div>
        <div className="middleProductPresentation">
          <div className="productPresentationSecondaryData">
            <div dangerouslySetInnerHTML={{ __html: salescontent }} />
          </div>
          <div className="productPresentationCourseContentList">
            <h3>Lista materiałów w tym kursie: </h3>
            <div dangerouslySetInnerHTML={{ __html: contentlist }} />
          </div>
        </div>
      </div>
      <CommentsWidget />
      <Footer />
    </div>
  );
};

export default SingleCourse;
