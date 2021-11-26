import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Navbar from "./components/ui/Navbar";
import Articles from "./components/articles/Articles";
import Article from "./components/articles/Article";
import ArticleForm from "./components/articles/ArticleForm";
import Footer from './components/ui/Footer';
import Login from './components/user/Login';
import { CartContext } from './contexts/CartContext';
import { UserContext } from './contexts/UserContext';
import { RandomContext } from './contexts/RandomContext';

const App = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState();
  const [random, setRandom] = useState({
    plop : "Salut les ploppers",
    plopinnette : "Je viens de très loin",
    ploppy : "hey moi c'est ploppy"
  });

  useEffect(() => {
    getCountCart();
    checkIfUser();
  }, []);

  const getCountCart = () => {
    const cartList = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    let countArticle = 0;
    cartList.forEach(item => {
      console.log(item)
      countArticle += item.quantity
    })
    localStorage.setItem('cart_count', JSON.stringify(countArticle))
    setCount(countArticle);
  }

  const checkIfUser = () => {
    localStorage.getItem('user') && setUser(JSON.parse(localStorage.getItem('user')));
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ count, setCount }}>
        <RandomContext.Provider value={{ random, setRandom }}>
        <Router>
          <Navbar />
          <Routes>
            <Route exac path="/" element={<Articles getCountCart={getCountCart}/>} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/create-article" element={<ArticleForm />} />
            <Route path="/edit-article/:id" element={<ArticleForm />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </Router>
        </RandomContext.Provider>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
