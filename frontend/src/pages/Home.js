import React from 'react';
import FriendList from '../components/Friends/FriendList';
import FriendRequests from '../components/Friends/FriendRequests';
import SearchUsers from '../components/Friends/SearchUsers';
import FriendRecommendations from '../components/Friends/FriendRecommendations';

const Home = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <FriendRecommendations />
                <FriendRequests />
            </div>
            <div>
                <FriendList />
                <SearchUsers />
            </div>
        </div>
    );
};

export default Home;
