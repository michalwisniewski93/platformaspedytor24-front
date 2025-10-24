import React, { useState, useEffect } from 'react';
import AdminWidgetToLogOut from './AdminWidgetToLogOut';
import { useSelector } from 'react-redux';
import http from '../api/http';
import {SERVER_URL} from "../consts";


const SalesSitesAdmin = () => {
  const isAdminLogged = useSelector(state => state.isAdminLogged);
  const [visibilityAddForm, setVisibilityAddForm] = useState(false);
  const [salessites, setSalessites] = useState([]);

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [numberoflessons, setNumberoflessons] = useState(0);
  const [price, setPrice] = useState(0);
  const [pricebeforethirtydays, setPricebeforethirtydays] = useState(0);
  const [salescontent, setSalescontent] = useState('');
  const [linktoyoutube, setLinktoyoutube] = useState('');
  const [contentlist, setContentlist] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);
  const [coursecontent, setCoursecontent] = useState('')
  const [courselinks, setCourselinks] = useState('')
  const [editingSite, setEditingSite] = useState(null);
  const [accesscode, setAccesscode] = useState('')

  useEffect(() => {
    http.get(`${SERVER_URL}/salessites`)
      .then((response) => setSalessites(response.data))
      .catch((err) => console.log('error fetching sales sites, error: ' + err));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const resetFormFields = () => {
    setTitle('');
    setNumberoflessons(0);
    setPrice(0);
    setPricebeforethirtydays(0);
    setSalescontent('');
    setLinktoyoutube('');
    setContentlist('');
    setAuthor('');
    setImageUrl('');
    setCoursecontent('')
    setCourselinks('')
    setFile(null);
    setAccesscode('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Wybierz plik');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadResponse = await http.post(`${SERVER_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageurl = uploadResponse.data.imageUrl;

      const response = await http.post(`${SERVER_URL}/salessites`, {
        title, imageurl, numberoflessons, price,
        pricebeforethirtydays, salescontent, linktoyoutube,
        contentlist, author, coursecontent, courselinks, accesscode
      });

      setSalessites([...salessites, response.data]);
      resetFormFields();
    } catch (error) {
      console.error('Błąd przy dodawaniu kursu:', error);
    }
    setVisibilityAddForm(false)
  };

  const handleDeleteSalessite = (id) => {
    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć artykuł?");
    if (!confirmDelete) return;

    http.delete(`${SERVER_URL}/salessites/${id}`)
      .then(() => setSalessites(salessites.filter(site => site._id !== id)))
      .catch((err) => console.error("Error deleting sales site:", err));
  };

  const handleEditSalessite = (site) => {
    setEditingSite(site);
    setTitle(site.title);
    setNumberoflessons(site.numberoflessons);
    setPrice(site.price);
    setPricebeforethirtydays(site.pricebeforethirtydays);
    setSalescontent(site.salescontent);
    setLinktoyoutube(site.linktoyoutube);
    setContentlist(site.contentlist);
    setAuthor(site.author);
    setImageUrl(site.imageurl);
    setCoursecontent(site.coursecontent)
    setCourselinks(site.courselinks)
    setAccesscode(site.accesscode)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateSalessite = async (e) => {
    e.preventDefault();

    let finalImageUrl = imageUrl;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await http.post(`${SERVER_URL}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        finalImageUrl = response.data.imageUrl;
      } catch (error) {
        console.error('Błąd przy uploadzie pliku:', error);
        return;
      }
    }

    http.put(`${SERVER_URL}/salessites/${editingSite._id}`, {
      title,
      imageurl: finalImageUrl,
      numberoflessons,
      price,
      pricebeforethirtydays,
      salescontent,
      linktoyoutube,
      contentlist,
      author,
      coursecontent,
      courselinks,
      accesscode
    })
      .then((response) => {
        setSalessites(salessites.map(site => site._id === editingSite._id ? response.data : site));
        setEditingSite(null);
        resetFormFields();
      })
      .catch((err) => console.error("Błąd przy aktualizacji strony:", err));
  };

  const getYouTubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
      } else if (urlObj.hostname.includes("youtube.com") && urlObj.searchParams.has("v")) {
        return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
      }
    } catch (error) {
      console.error("Invalid YouTube URL:", url);
    }
    return "";
  };

  return (
    <>
      {isAdminLogged ?
        <div className="adminKokpit">
          <AdminWidgetToLogOut />
          <div className="salesSitesAdmin">
            <h1>Strony sprzedażowe kursów</h1>

            <button className="buttonToEdit" onClick={() => setVisibilityAddForm(!visibilityAddForm)}>
              {visibilityAddForm ? 'Anuluj dodawanie strony sprzedażowej' : 'Dodaj stronę sprzedażową'}
            </button>

            {editingSite && (
              <form onSubmit={handleUpdateSalessite}>
                <h2>Edytujesz kurs: {editingSite.title}</h2>
                <label>Tytuł kursu: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></label>
                <label>Okładka kursu: <input type="file" onChange={handleFileChange} /></label>
                <label>Liczba lekcji: <input type="number" value={numberoflessons} onChange={(e) => setNumberoflessons(e.target.value)} /></label>
                <label>Cena brutto: <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></label>
                <label>Najniższa cena z 30 dni: <input type="number" value={pricebeforethirtydays} onChange={(e) => setPricebeforethirtydays(e.target.value)} /></label>
                <label>Treść sprzedażowa: <textarea value={salescontent} onChange={(e) => setSalescontent(e.target.value)} /></label>
                <label>Link do YouTube: <input type="text" value={linktoyoutube} onChange={(e) => setLinktoyoutube(e.target.value)} /></label>
                <label>Lista materiałów: <textarea value={contentlist} onChange={(e) => setContentlist(e.target.value)} /></label>
                <label>Autor: <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /></label>
                <label>Treść kursu z identyfikatorami: <textarea  value={coursecontent} onChange={(e) => setCoursecontent(e.target.value)}></textarea></label>
                <label>Linki kursu (kotwice linkujące): <textarea  value={courselinks} onChange={(e) => setCourselinks(e.target.value)}></textarea></label>
                <label>Kod dostępu: <input type="text" value={accesscode} onChange={(e) => setAccesscode(e.target.value)}/></label>
                <button className="buttonToEdit">Zapisz zmiany</button>
                <button type="button" onClick={() => { setEditingSite(null); resetFormFields(); }}>Anuluj edycję</button>
              </form>
            )}

            {visibilityAddForm && !editingSite && (
              <form onSubmit={handleSubmit}>
                <label>Tytuł kursu: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></label>
                <label>Okładka kursu: <input type="file" onChange={handleFileChange} /></label>
                <label>Liczba lekcji: <input type="number" value={numberoflessons} onChange={(e) => setNumberoflessons(e.target.value)} /></label>
                <label>Cena brutto: <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></label>
                <label>Najniższa cena z 30 dni: <input type="number" value={pricebeforethirtydays} onChange={(e) => setPricebeforethirtydays(e.target.value)} /></label>
                <label>Treść sprzedażowa: <textarea value={salescontent} onChange={(e) => setSalescontent(e.target.value)} /></label>
                <label>Link do YouTube: <input type="text" value={linktoyoutube} onChange={(e) => setLinktoyoutube(e.target.value)} /></label>
                <label>Lista materiałów: <textarea value={contentlist} onChange={(e) => setContentlist(e.target.value)} /></label>
                <label>Autor: <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /></label>
                 <label>Treść kursu z identyfikatorami: <textarea  value={coursecontent} onChange={(e) => setCoursecontent(e.target.value)}></textarea></label>
                 <label>Linki kursu (kotwice linkujące): <textarea  value={courselinks} onChange={(e) => setCourselinks(e.target.value)}></textarea></label>
                <label>Kod dostępu: <input type="text" value={accesscode} onChange={(e) => setAccesscode(e.target.value)} /></label>
                <button className="buttonToEdit">Dodaj kurs</button>
              </form>
            )}

            <div className="salesSitesPresentationOnAdmin">
              <h1>Strony sprzedażowe kursów - ({salessites.length})</h1>
              {salessites.map(site => (
                
                <div className="salesSitesItem" key={site._id}>
                  <h3>Tytuł kursu: {site.title}</h3>
                  <img src={`${SERVER_URL}${site.imageurl}`} alt={site.title} />
                  <h3>Ilość lekcji: {site.numberoflessons}</h3>
                  <h3>Cena brutto: {site.price} zł</h3>
                  <h3>Najniższa cena z 30 dni: {site.pricebeforethirtydays} zł</h3>
                  <div>
                    <h4>Treść sprzedażowa:</h4>
                    <div style={{ border: '1px dotted black' }} dangerouslySetInnerHTML={{ __html: site.salescontent }} />
                    
                  </div>
                  <h4>Link do YouTube: {site.linktoyoutube}</h4>
                  <iframe
                    width="560"
                    height="315"
                    src={getYouTubeEmbedUrl(site.linktoyoutube)}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div>
                    <h4>Lista materiałów:</h4>
                    <div style={{ border: '1px dotted black' }} dangerouslySetInnerHTML={{ __html: site.contentlist }} />
                  </div>
                  <h4>Autor: {site.author}</h4>
                  <div>
                    <h1>Treść kursu z identyfikatorami:</h1>
                    <div style={{ border: '1px dotted black' }} dangerouslySetInnerHTML={{ __html: site.coursecontent }} />
                  </div>
                  <div>
                    <h1>Linki kursu (kotwice linkujące):</h1>
                    <div style={{ border: '1px dotted black' }} dangerouslySetInnerHTML={{ __html: site.courselinks }} />
                  </div>
                  <h4>Kod dostępu: {site.accesscode}</h4>
                  <button onClick={() => handleDeleteSalessite(site._id)}>Usuń stronę</button>
                  <button onClick={() => handleEditSalessite(site)}>Edytuj stronę</button>
                </div>
              )).reverse()}
              
            </div>
          </div>
        </div>
        : <span>Nie masz dostępu</span>}
    </>
  );
};

export default SalesSitesAdmin;
