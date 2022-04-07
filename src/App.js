import './App.css';
import {useState, useEffect} from 'react';
import Noticia from "./Componentes/Noticia/Noticia"

function App() {

  const [termino, setTermino] = useState("");
  const [noticias, setNoticias] = useState( []);
  const [URL, setURL] = useState( "https://newsapi.org/v2/top-headlines?country=us&apiKey=8ce7af7ef5d74135b84c82a1aab7b6a4&category=general")

  useEffect(() =>{
    let configuracion ={
      method : "GET"
    };
    fetch (URL, configuracion)
      .then( respuesta => {
        if( respuesta.ok){
          return respuesta.json();
        }
      })
      .then( listaNoticias =>{
        console.log(listaNoticias);
        if( listaNoticias.articles){
          setNoticias( (noticiaPrev) => listaNoticias.articles );
        }  
      });
  }, []);

  useEffect( () => {
    let configuracion ={
      method : "GET"
    };
    fetch (`https://newsapi.org/v2/everything?apiKey=8ce7af7ef5d74135b84c82a1aab7b6a4&q=${termino}`, configuracion)
      .then( respuesta => {
        if( respuesta.ok){
          return respuesta.json();
        }
      })
      .then( listaNoticias =>{
        if( listaNoticias.articles){
          setNoticias( (noticiaPrev) => listaNoticias.articles );
        }
          
      });
  }, [termino])

  const buscarNoticias = (event) => {
    event.preventDefault();
    
    let termino =event.target.termino.value;
    setTermino( (terminoPrev) => termino);

    

  }

  return (
    <div className="App">
      <form onSubmit={(event) => buscarNoticias(event)}>
          <label htmlFor = "termino">
            Termino de búsqueda:
          </label>
          {/*
          <input type="text" id="termino" 
            value={termino} 
            onChange={(event) =>setTermino(event.target.value)}/>
  */}
          <input type="text" id="termino"/>
          <button type="submit">
            Buscar
          </button>
      </form>
      <div className='noticias'>
        {
          noticias.map (( noticia, indice) =>{
            return ( <Noticia key={'noticia_' + indice} noticia={noticia}/>)
          }
          )
        }
      </div>
    </div>
  );
}

export default App;
