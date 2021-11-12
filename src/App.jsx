import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from "./components/ui/Navbar";
import Articles from "./components/articles/Articles";
import Article from "./components/articles/Article";
import ArticleForm from "./components/articles/ArticleForm";
import Footer from './components/ui/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exac path="/" element={<Articles />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/create-article" element={<ArticleForm />} />
        <Route path="/edit-article/:id" element={<ArticleForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
