import { Routes, Route } from "react-router-dom";
import './App.css'
import Articles from './components/Articles'
import DetailedArticle from "./components/DetailedArticle";
import Favorites from "./components/Favorites";
import FavArticleDetails from "./components/FavArtcleDetails";


function App() {

  return (
    <Routes>
        <Route path="/" element={<Articles/>} /> {/* Home page */}
        <Route path="/favorites" element={<Favorites/>} />

        <Route path="/article/:title" element={<DetailedArticle/>} /> 
        <Route path="/favorites/:title" element={<FavArticleDetails/>} /> 


    </Routes>
  );
}

export default App
