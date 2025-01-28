// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            setIsAuthenticated(false);
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const signup = async (userData) => {
        try {
            const res = await axios.post('/api/auth/signup', userData);
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
        } catch (err) {
            console.error(err);
            alert(err.response.data.message || 'Signup failed');
        }
    };

    const login = async (userData) => {
        try {
            const res = await axios.post('/api/auth/login', userData);
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            //setFlag(true);
        } catch (err) {
            console.error(err);
            alert(err.response.data.message || 'Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, signup, login, logout, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

