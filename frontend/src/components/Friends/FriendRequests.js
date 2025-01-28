import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api'; // Updated import
import toast from 'react-hot-toast';

const FriendRequests = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchRequests = async () => {
                try {
                    const res = await api.get('/friends/requests');
                    setRequests(res.data);
                } catch (err) {
                    console.error(err);
                    toast.error(err.response?.data?.message || 'Failed to fetch friend requests');
                } finally {
                    setLoading(false);
                }
            };
            fetchRequests();
        }
    }, [isAuthenticated]);

    const handleResponse = async (requestId, action) => {
        try {
            await api.post('/friends/respond', { requestId, action });
            setRequests(requests.filter(req => req._id !== requestId));
            toast.success(`Friend request ${action}ed`);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || `Failed to ${action} friend request`);
        }
    };

    if (loading) {
        return (
            <div className="bg-white p-6 rounded shadow mt-6">
                <h3 className="text-xl font-semibold mb-4">Friend Requests</h3>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded shadow mt-6">
            <h3 className="text-xl font-semibold mb-4">Friend Requests</h3>
            {requests.length === 0 ? (
                <p>No incoming friend requests.</p>
            ) : (
                <ul className="space-y-2">
                    {requests.map(req => (
                        <li key={req._id} className="flex justify-between items-center">
                            <span>{req.from.username}</span>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleResponse(req._id, 'accept')}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleResponse(req._id, 'reject')}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FriendRequests;
