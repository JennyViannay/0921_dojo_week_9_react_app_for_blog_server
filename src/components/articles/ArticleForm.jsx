import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

const ArticleForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/articles/${id}`)
                .then(res => res.data)
                .then(data => {
                    setTitle(data[0].title);
                    setContent(data[0].content);
                    setImage(data[0].image);
                })
        }
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && content && image) {
            const article = {
                title: title,
                content: content,
                image: image
            };
            if (id) editArticle(article);
            else postArticle(article);
        } else {
            alert('Please fill in all fields');
        }
    }

    const postArticle = (article) => {
        axios.post('http://localhost:5000/articles', article)
            .then(res => console.log(res.data))
            .then(() => navigate('/'))
    }

    const editArticle = (article) => {
        axios.put(`http://localhost:5000/articles/${id}`, article)
            .then(res => console.log(res.data))
            .then(() => navigate('/'))
    }

    return (
        <div className="flex justify-center mt-20 px-20">
            <div className="w-full">
                <h1 className="text-2xl text-center font-bold">{id ? 'Edit Article' : 'Create Article'}</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title*
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title ? title : ''}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                            Content*
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="content"
                            placeholder="content"
                            onChange={(e) => setContent(e.target.value)}
                            value={content ? content : ''}>
                        </textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Image*
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="image"
                            type="text"
                            placeholder="Image"
                            onChange={(e) => setImage(e.target.value)}
                            value={image ? image : ''} />
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            {id ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ArticleForm;