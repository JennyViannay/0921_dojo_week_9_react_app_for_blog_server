import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import ArticleCard from './ArticleCard';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import { RandomContext } from '../../contexts/RandomContext';
// Component Parent :
// Contient les datas et les methodes pour mes enfants
const Articles = ({ getCountCart }) => {
    // init d'un state pour recevoir tous les articles
    const [articles, setArticles] = useState([]);
    const { count, setCount } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const { random } = useContext(RandomContext);
    // lorsque le compononent sera monté, useEffect appelera la methode getAllArticles
    useEffect(() => {
        getAllArticles()
    }, [])

    // getAllArticles permet de requêter le serveur sur l'URi permettant d'obtenir tous les articles depuis la bdd
    const getAllArticles = () => {
        axios.get('http://localhost:5000/articles')
            .then(res => res.data)
            .then(data => setArticles(data))
    }

    // deleteArticle permet de requêter le serveur sur l'URi permettant de supprimer un article en bdd
    // la methode prend en parametre id qui prendra pour valeur l'id de l'article à supprimer
    const deleteArticle = (id) => {
        axios.delete(`http://localhost:5000/articles/${id}`)
            .then(res => res.data)
        // une fois que j'ai supprimé un article en bdd, pour que mon state 'articles' se mette,
        // je refais appel à la methode getAllArticles qui renvoie une requête vers le serveur et récupère tous les articles en bdd  
        getAllArticles()
    }

    const addToCart = (idArticle) => {
        const newCartList = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        if (!newCartList.some(item => item.id === idArticle)) {
            newCartList.push({ id: idArticle, quantity: 1 })
        } else {
            newCartList.forEach(item => {
                if (item.id === idArticle) {
                    item.quantity++
                }
            })
        }
        localStorage.setItem('cart', JSON.stringify(newCartList))
        getCountCart();
    }
    console.log(random)
    return (
        <div className="flex flex-wrap">
            
            {articles ?
                articles.map(article => (
                    // compononent enfant me permettant d'afficher un article et de lui passer les methodes dont il a besoin
                    // ici article (toutes les infos d'un article) et deleteArticle (methode pour supprimer un article)
                    <ArticleCard key={article.id} article={article} deleteArticle={deleteArticle} addToCart={addToCart} />
                ))
                :
                <p>Nothing to show</p>
            }
            {random && random.plopinnette}
        </div>
    )
}

export default Articles;