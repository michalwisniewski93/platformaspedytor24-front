import React, {useState, useEffect} from 'react'
import AdminWidgetToLogOut from './AdminWidgetToLogOut';
import { useSelector } from 'react-redux';
import http from '../api/http';


const BlogAdmin = () => {

     const isAdminLogged = useSelector(state => state.isAdminLogged)

     const [articles, setArticles] = useState([])

     const [articleTitle, setArticleTitle] = useState('')
     const [articleDescription, setArticleDescription] = useState('')
     const [articleAuthor, setArticleAuthor] = useState('')
     const [imageUrl, setImageUrl] = useState('');
     const [file, setFile] = useState(null);

     
  useEffect(() => {
    http.get('https://platformaspedytor8-back-production.up.railway.app/articles')
    .then((response) => setArticles(response.data))
    .catch((err) => console.log('error fetching articles, error: ' + err))
   }, [])



   useEffect(() => {
    const title = articleTitle
    const description = articleDescription
    const author = articleAuthor
    const imageurl = imageUrl
    
    if (imageUrl !== '') {
     
      http.post("https://platformaspedytor8-back-production.up.railway.app/articles", {title, description, author, imageurl})
        .then(response => setArticles([...articles, response.data]))
        .catch(err => console.error('Error adding articles', err));
    }

    setArticleTitle('')
    setArticleAuthor('')
    setArticleDescription('')
   
   
  }, [imageUrl]);


   const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }



  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!file) {
      alert('Wybierz plik');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await http.post('https://platformaspedytor8-back-production.up.railway.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Zapisujemy pełną ścieżkę do obrazu w stanie
     
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error uploading file', error);
    }

  }


  const handleDeleteArticle = (id) => {
    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć artykuł?");
    if (!confirmDelete) {return;} // użytkownik kliknął 'Nie
    http.delete(`https://platformaspedytor8-back-production.up.railway.app/articles/${id}`)
          .then(() => setArticles(articles.filter(article => article._id !== id)))
          .catch((err) => console.error("Error deleting article:", err));
  }
    

    return (
            <>
            {isAdminLogged ? 
            <div className="adminKokpit">
                <AdminWidgetToLogOut/>
                <div className="BlogAdmin">
                   <h1>Blog Admin</h1>
                   <div className="addNewArticle">
                    <h3>Dodawanie nowego artykułu</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Tytuł artykułu: 
                            <input type="text" name="" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} />
                        </label>
                        <label>Treść artykułu:
                            <textarea name="" value={articleDescription} onChange={(e) => setArticleDescription(e.target.value)}></textarea>
                        </label>
                        <label>Autor:
                            <input type="text" value={articleAuthor} onChange={(e) => setArticleAuthor(e.target.value)}/>
                        </label>
                        <label style={{ border: 'none', outline: 'none', boxShadow: 'none' }}>Zdjęcie: <span className="warning">Uwaga! jeżeli po dodaniu zdjęcie się nie zaktualizuje w widoku artykułu - odśwież stronę. Wrzuć grafikę o wymiarach: 1153px szerokości, 682px wysokości. </span>
                        <input style={{ border: 'none', outline: 'none', boxShadow: 'none' }} type="file" onChange={handleFileChange}/>
                    </label>
                       
                        <button>Dodaj artykuł</button>
                    </form>
                   </div>
                   <div className="articlesPresentationAtAdmin">
                    <h1>Artykuły ({articles.length})</h1>
                    {articles.map(article => 
                    <div className="singleArticleAdmin" key={article._id}>
                        <h3>tytuł: {article.title}</h3>
                        <h3>treść artykułu:</h3>
                        <div style={{border: '1px dotted black'}} dangerouslySetInnerHTML={{ __html: article.description }} />
                        <h3>autor: {article.author}</h3>
                        <h3>zdjęcie produktu:</h3>
                        <img src={`https://platformaspedytor8-back-production.up.railway.app/${article.imageurl}`} alt={article.title} />
                        <button onClick={() => handleDeleteArticle(article._id)}>Usuń artykuł</button>
                    </div>).reverse()}
                   </div>
                   
                </div>
            </div> 
            : <span>nie masz dostępu</span>}
            </>
        )
}

export default BlogAdmin;
