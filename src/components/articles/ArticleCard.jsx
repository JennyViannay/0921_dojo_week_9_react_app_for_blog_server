import { Link } from "react-router-dom";
import { FaTrash, FaPen, FaRegHeart, FaHeart, FaCartPlus } from 'react-icons/fa';
import { useEffect, useState } from "react";

// component enfant recevant les props : les infos d'un article et la fonction deleteArticle
const ArticleCard = ({ article, deleteArticle, addToCart }) => {
    const [wishlist, setWishlist] = useState([]);

    // au moment ou component est chargé je veux recup wishlist depuis localStorage si elle existe et setState sinon 
    // je crée wishlist dans localStorage et je mets a jour mon state avec wishlist vide
    useEffect(() => {
        getWishlistFromLocalStrorage()
    }, [])

    const getWishlistFromLocalStrorage = () => {
        const favoritesList = localStorage.getItem('wishlist');
        favoritesList ? setWishlist(JSON.parse(favoritesList)) : localStorage.setItem('wishlist', JSON.stringify([]));
    }

    const addToWishlist = (id) => {
        const favoritesList = localStorage.getItem('wishlist');
        const newFavoriteList = favoritesList ? JSON.parse(favoritesList) : [];
        if (!newFavoriteList.includes(id)) {
            newFavoriteList.push(id)
        }
        localStorage.setItem('wishlist', JSON.stringify(newFavoriteList));
        getWishlistFromLocalStrorage();
    }

    const deleteToWishlist = (idArticle) => {
        const favoritesList = localStorage.getItem('wishlist');
        const newFavoriteList = favoritesList ? JSON.parse(favoritesList) : [];
        const newList = newFavoriteList.filter(id => id !== idArticle)
        localStorage.setItem('wishlist', JSON.stringify(newList));
        getWishlistFromLocalStrorage()
    }

    return (
        <div className="p-10">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Link to={`/article/${article.id}`}>
                    <img className="w-full" src={article.image} alt="Mountain" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{article.title}</div>
                        <p className="text-gray-700 text-base">{article.content}</p>
                    </div>
                </Link>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
                <div className="flex justify-center px-6 pt-4 pb-2">
                    <button
                        className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-4 mx-2 rounded-full"
                        // quand j'appelle une methode directement dans le onClick je dois la déclencher dans une fonction anonyme : () => {maMethode()}
                        // car sinon la methode deleteArticle provoquera des effets de bord inatendus 
                        onClick={() => deleteArticle(article.id)}>
                        <FaTrash />
                    </button>
                    <Link
                        to={`/edit-article/${article.id}`}
                        className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-4 mx-2 rounded-full">
                        <FaPen />
                    </Link>
                    {
                        wishlist.includes(article.id) ?
                            <button
                                className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-4 mx-2 rounded-full"
                                onClick={() => deleteToWishlist(article.id)}>
                                <FaHeart />
                            </button>
                            :
                            <button
                                className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-4 mx-2 rounded-full"
                                onClick={() => addToWishlist(article.id)}>
                                <FaRegHeart />
                            </button>
                    }
                    <button
                        className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-4 mx-2 rounded-full"
                        onClick={() => addToCart(article.id)}>
                        <FaCartPlus />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ArticleCard;