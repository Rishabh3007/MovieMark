import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();
    const { setIsLoggedIn } = useUser();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, { email, password }, { withCredentials: true });
            console.log(response);
            if(response.data.status){
                setIsLoggedIn(true);
                history('/');
            }
            else{
                setError('Invalid username or password');
            }
            
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl text-white mb-6">Login</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded text-black"
                        />
                    </div>
                    <button type="submit" className="w-full py-2 bg-teal-500 text-white rounded">Login</button>
                    <p className='text-white'>Don't have an account <Link className=' text-cyan-600 underline' to={"/register"}>Register Now!</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
