import { Routes, Route } from "react-router-dom";
import './App.css'
import Articles from './components/Articles'
import DetailedArticle from "./components/DetailedArticle";


function App() {

  return (
    <Routes>
        <Route path="/" element={<Articles/>} /> {/* Home page */}
        <Route path="/article/:title" element={<DetailedArticle/>} /> Article detail page
    </Routes>
  );
}

export default App
