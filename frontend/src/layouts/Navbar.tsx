import React, { useState } from 'react'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className=" bg-transparent flex flex-wrap items-center py-4">
            <div className="flex-1 flex justify-between items-center">
                <a href="#" className=" text-3xl text-primary">MovieMark</a>
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
                        <li><a className="md:p-4 py-3 px-0 block" href="#">Logout</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar