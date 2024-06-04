import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log('Email:', email);
        // console.log('Name:', name);
        // console .log('Password  :', password);
        // console.log('Confirm Password   :', confirmPassword);
        // console.log('Phone Number:', phoneNumber);
        if (!email || !password || !confirmPassword || !phoneNumber || !name) {
            setError('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, { email, password, name, phoneNumber }, { withCredentials: true });
            console.log(response);
            // console.log(JSON.parse(response));
            if (response.data.status) {
                history('/login');
            } else {
                setError(response.data.error || 'Registration failed');
            }
        } catch (err : any) {
            if(err.response.data){
                setError(err.response.data.error || 'Registration failed');
            }
            else{
                setError('Registration failed');
            }
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl text-white mb-6">Register</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleRegister}>
                <div className="mb-4">
                        <label className="block text-white mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded text-black"
                        />
                    </div>
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
                        <label className="block text-white mb-2">Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                    <div className="mb-4">
                        <label className="block text-white mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded text-black"
                        />
                    </div>
                    <button type="submit" className="w-full py-2 bg-teal-500 text-white rounded" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
