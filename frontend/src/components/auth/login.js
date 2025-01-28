import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link,  useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Updated import
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate(); // Initialize navigate
    const { setToken} = useContext(AuthContext);// Modify AuthContext to include setAuthToken if needed
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token); // Use setToken instead of setAuthToken
            toast.success('login successful');
             navigate('/'); // Use navigate for redirection
           
        } catch (err) {
            console.error(err);
            toast.error("Login failed");
            
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-500 hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Login;
