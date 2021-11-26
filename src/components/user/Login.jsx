import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { RandomContext } from "../../contexts/RandomContext";

const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const { random } = useContext(RandomContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            const user = {
                username: username,
                password: password
            };
            authUser(user);
        } else {
            alert('Please fill in all fields');
        }
    }

    const authUser = (user) => {
        axios.post('http://localhost:5000/users/login', user)
            .then(res => res.data)
            .then(data => { 
                // localStorage.setItem('user', data);
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
                window.location.href = '/';
            })
            .catch(err => setError(err.response.data.message));
    }
console.log(random);
    return (
        <div className="flex justify-center mt-20 px-20">
            <div className="w-full">
                <h1 className="text-2xl text-center font-bold">Loggin</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {random && random.plop}
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            username*
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            password*
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="text"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password ? password : ''} />
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;