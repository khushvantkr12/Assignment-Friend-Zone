import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api'; // Updated import
import toast from 'react-hot-toast';

const FriendRecommendations = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchRecommendations = async () => {
                try {
                    const res = await api.get('/friends/recommendations');
                    setRecommendations(res.data);
                } catch (err) {
                    console.error(err);
                    toast.error(err.response?.data?.message || 'Failed to fetch recommendations');
                    
                } finally {
                    setLoading(false);
                }
            };
            fetchRecommendations();
        }
    }, [isAuthenticated]);

    const sendRequest = async (username) => {
        try {
            await api.post('/friends/request', { toUsername: username });
            toast.success('Friend request sent');
            setRecommendations(recommendations.filter(rec => rec.username !== username));
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to send friend request');
        }
    };

    if (loading) {
        return (
            <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-semibold mb-4">Friend Recommendations</h3>
                <p>Loading recommendations...</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Friend Recommendations</h3>
            {recommendations.length === 0 ? (
                <p>No recommendations available.</p>
            ) : (
                <ul className="space-y-2">
                    {recommendations.map(rec => (
                        <li key={rec.id} className="flex justify-between items-center">
                            <div>
                                <span className="font-medium">{rec.username}</span>
                                {rec.mutualFriendsCount > 0 && (
                                    <span className="text-sm text-gray-500 ml-2">
                                        ({rec.mutualFriendsCount} mutual friend{rec.mutualFriendsCount > 1 ? 's' : ''})
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => sendRequest(rec.username)}
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
                            >
                                Add Friend
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FriendRecommendations;
