import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api'; // Updated import
import toast from 'react-hot-toast';

const SearchUsers = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        try {
            const res = await api.get(`/friends/search?q=${encodeURIComponent(query)}`);
            setUsers(res.data);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to search users');
        } finally {
            setLoading(false);
        }
    };

    const sendRequest = async (username) => {
        try {
            await api.post('/friends/request', { toUsername: username });
            toast.success('Friend request sent');
           
            setUsers(users.filter(user => user.username !== username));
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to send friend request');
            
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow mt-6">
            <h3 className="text-xl font-semibold mb-4">Search Users</h3>
            <form onSubmit={search} className="flex space-x-2">
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search by username"
                    required
                    className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
            <ul className="mt-4 space-y-2">
                {users.length === 0 && !loading ? (
                    <p>No users found.</p>
                ) : (
                    users.map(user => (
                        <li key={user._id} className="flex justify-between items-center">
                            <span>{user.username}</span>
                            <button
                                onClick={() => sendRequest(user.username)}
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
                            >
                                Add Friend
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default SearchUsers;
