import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`, { withCredentials: true });
            console.log(response);
            if (response.data.status) {
                window.location.href = '/login';
            }
        } catch (err) {
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    return (
        <header className=" bg-transparent flex flex-wrap items-center py-4">
            <div className="flex-1 flex justify-between items-center">
                <Link to="/" className="text-3xl text-primary">MovieMark</Link>
            </div>

            <div className="md:hidden">
                <button onClick={handleToggle} className="focus:outline-none">
                    <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <title>menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </button>
            </div>
            <input className="hidden" type="checkbox" id="menu-toggle" />

            <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
                <nav className="md:flex items-center justify-between text-base text-primary pt-4 md:pt-0 w-full">
                    <ul className="md:flex items-center justify-between text-base text-primary pt-4 md:pt-0">
                        <li><button className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-150 ease-in-out" disabled={loading}
                        onClick={handleLogout}>{loading ? "logging out....": ("Logout")}</button></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar