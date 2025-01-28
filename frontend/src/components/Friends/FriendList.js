import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api'; // Updated import
import toast from 'react-hot-toast';

const FriendList = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchFriends = async () => {
                try {
                    const res = await api.get('/friends');
                    setFriends(res.data);
                } catch (err) {
                    console.error(err);
                    toast.error(err.response?.data?.message || 'Failed to fetch friends');
                    
                } finally {
                    setLoading(false);
                }
            };
            fetchFriends();
        }
    }, [isAuthenticated]);

    const handleUnfriend = async (friendId) => {
        if (!window.confirm('Are you sure you want to unfriend this user?')) return;
        try {
            await api.delete(`/friends/${friendId}`);
            setFriends(friends.filter(friend => friend._id !== friendId));
            toast.success('Unfriended successfully');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to unfriend');
            
        }
    };

    if (loading) {
        return (
            <div className="bg-white p-6 rounded shadow mt-6">
                <h3 className="text-xl font-semibold mb-4">Your Friends</h3>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded shadow mt-6">
            <h3 className="text-xl font-semibold mb-4">Your Friends</h3>
            {friends.length === 0 ? (
                <p>No friends added yet.</p>
            ) : (
                <ul className="space-y-2">
                    {friends.map(friend => (
                        <li key={friend._id} className="flex justify-between items-center">
                            <span>{friend.username}</span>
                            <button
                                onClick={() => handleUnfriend(friend._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                            >
                                Unfriend
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FriendList;
