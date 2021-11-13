import axios from "axios";
import { useState, useEffect } from "react";
import { FaHeart } from 'react-icons/fa';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getFavorites()
    }, [])

    const getFavorites = () => {
        const favoriteList = localStorage.getItem('wishlist');
        favoriteList ? setWishlist(JSON.parse(favoriteList)) : localStorage.setItem('wishlist', JSON.stringify([]));
        favoriteList && favoriteList.length > 0 ? getArticles(JSON.parse(favoriteList)) : setArticles([]);
    }

    const getArticles = (listId) => {
        listId.forEach(id =>
            axios.get(`http://localhost:5000/articles/${id}`)
                .then(res => res.data)
                .then(data => {
                    if (!articles.some(article => article.id === data[0].id)) setArticles(articles => [...articles, data[0]])
                })
        )
    }

    const deleteFromWishlist = (articleId) => {
        const favoriteList = localStorage.getItem('wishlist');
        const newFavoriteList = favoriteList ? JSON.parse(favoriteList) : [];
        const newList = newFavoriteList.filter(id => id !== articleId);
        localStorage.setItem('wishlist', JSON.stringify(newList));
        setArticles(articles.filter(article => article.id !== articleId))
    }

    return (
        <div className="flex p-20">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {articles && articles.length > 0 ?
                        articles.map(article =>
                            <tr key={article.id}>
                                <td>{article.title}</td>
                                <td>{article.content}</td>
                                <td><img src={article.image} alt="" className="w-1/5" /></td>
                                <td>
                                    <button
                                        className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-4 mx-2 rounded-full"
                                        onClick={() => deleteFromWishlist(article.id)}>
                                        <FaHeart />
                                    </button>
                                </td>
                            </tr>
                        )
                        : 'No wishlist available'}
                </tbody>
            </table>
        </div>
    )
}

export default Wishlist;