import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPen, FaRegHeart, FaHeart } from 'react-icons/fa';

// component enfant recevant les props : les infos d'un article et la fonction deleteArticle
const ArticleCard = ({ article, deleteArticle }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        getFavorites()
    }, [])

    const getFavorites = () => {
        const favoriteList = localStorage.getItem('wishlist');
        favoriteList ? setWishlist(JSON.parse(favoriteList)) : localStorage.setItem('wishlist', JSON.stringify([]));
    }

    const addToWishlist = (articleId) => {
        const favoriteList = localStorage.getItem('wishlist');
        const newFavoriteList = favoriteList ? JSON.parse(favoriteList) : [];
        if (!newFavoriteList.includes(articleId)) {
            newFavoriteList.push(articleId)
        }
        localStorage.setItem('wishlist', JSON.stringify(newFavoriteList))
        getFavorites();
    }

    const deleteFromWishlist = (articleId) => {
        const favoriteList = localStorage.getItem('wishlist');
        const newFavoriteList = favoriteList ? JSON.parse(favoriteList) : [];
        console.log(newFavoriteList)
        const newList = newFavoriteList.filter(id => id !== articleId)
        console.log(newList)
        localStorage.setItem('wishlist', JSON.stringify(newList));
        getFavorites();
    }

    //console.log(wishlist);
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
                            onClick={() => deleteFromWishlist(article.id)}>
                            <FaHeart />
                        </button>
                        :
                        <button
                            className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-4 mx-2 rounded-full"
                            onClick={() => addToWishlist(article.id)}>
                            <FaRegHeart />
                        </button>
                        
                    }
                </div>
            </div>
        </div>
    )
}
export default ArticleCard;