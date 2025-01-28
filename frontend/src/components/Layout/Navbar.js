

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        toast.success('Logged out successfully');
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo and Brand Name */}
                <Link to="/" className="flex items-center space-x-2 text-white text-xl font-bold">
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCLVW5aksCgE0jA5sqMcGzPB_Bm5AfIjr-dw&s" 
                        alt="Logo" 
                        className="w-10 h-10 rounded-full shadow-lg object-cover"
                    />
                    <span>Friend Zone</span>
                </Link>

                {/* Navigation Links */}
                <ul className="flex space-x-4">
                    {isAuthenticated ? (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-200"
                            >
                                <span>Logout</span>
                                <IoIosLogOut className="ml-1" size={20} />
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/signup"
                                    className="text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-200"
                                >
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-200"
                                >
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

