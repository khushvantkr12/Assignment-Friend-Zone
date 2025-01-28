const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

// Send Friend Request
exports.sendFriendRequest = async (req, res) => {
    const fromUserId = req.user.id;
    const { toUsername } = req.body;

    try {
        const toUser = await User.findOne({ username: toUsername });
        if (!toUser) return res.status(404).json({ message: 'User not found' });

        if (toUser.id === fromUserId) {
            return res.status(400).json({ message: 'Cannot add yourself as a friend' });
        }

        // Check if already friends
        const fromUser = await User.findById(fromUserId);
        if (fromUser.friends.includes(toUser.id)) {
            return res.status(400).json({ message: 'User is already your friend' });
        }

        // Check if a friend request already exists
        const existingRequest = await FriendRequest.findOne({
            from: fromUserId,
            to: toUser.id,
            status: 'pending',
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already sent' });
        }

        const friendRequest = new FriendRequest({
            from: fromUserId,
            to: toUser.id,
        });

        await friendRequest.save();
        res.status(201).json({ message: 'Friend request sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get Incoming Friend Requests
exports.getIncomingRequests = async (req, res) => {
    const userId = req.user.id;
    try {
        const requests = await FriendRequest.find({ to: userId, status: 'pending' })
            .populate('from', 'username');
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Respond to Friend Request
exports.respondToFriendRequest = async (req, res) => {
    const userId = req.user.id;
    const { requestId, action } = req.body; // action: 'accept' or 'reject'

    try {
        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) return res.status(404).json({ message: 'Friend request not found' });
        if (friendRequest.to.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to respond to this request' });
        }
        if (friendRequest.status !== 'pending') {
            return res.status(400).json({ message: 'Friend request already responded to' });
        }

        if (action === 'accept') {
            friendRequest.status = 'accepted';
            await friendRequest.save();

            // Add each user to the other's friends list
            await User.findByIdAndUpdate(userId, { $push: { friends: friendRequest.from } });
            await User.findByIdAndUpdate(friendRequest.from, { $push: { friends: userId } });

            res.json({ message: 'Friend request accepted' });
        } else if (action === 'reject') {
            friendRequest.status = 'rejected';
            await friendRequest.save();
            res.json({ message: 'Friend request rejected' });
        } else {
            res.status(400).json({ message: 'Invalid action' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get Friends List
exports.getFriends = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).populate('friends', 'username');
        res.json(user.friends);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Unfriend
exports.unfriend = async (req, res) => {
    const userId = req.user.id;
    const { friendId } = req.params;

    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);
        if (!friend) return res.status(404).json({ message: 'Friend not found' });

        // Remove friend from user's friends list
        user.friends = user.friends.filter(id => id.toString() !== friendId);
        await user.save();

        // Remove user from friend's friends list
        friend.friends = friend.friends.filter(id => id.toString() !== userId);
        await friend.save();

        res.json({ message: 'Unfriended successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Search Users
exports.searchUsers = async (req, res) => {
    const query = req.query.q;
    const userId = req.user.id;
    try {
        const users = await User.find({
            username: { $regex: query, $options: 'i' },
            _id: { $ne: userId },
        }).select('username');

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Friend Recommendations
exports.getRecommendations = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).populate('friends');
        const userFriends = user.friends.map(friend => friend.id);

        // Find users who are not friends and not the user
        const potentialFriends = await User.find({
            _id: { $nin: [...userFriends, userId] },
        }).populate('friends');

        // Calculate mutual friends
        const recommendations = potentialFriends.map(potential => {
            const mutualFriends = potential.friends.filter(f => userFriends.includes(f.id));
            return {
                id: potential.id,
                username: potential.username,
                mutualFriendsCount: mutualFriends.length,
                mutualFriends: mutualFriends.map(f => f.username),
            };
        });

        // Sort by number of mutual friends
        recommendations.sort((a, b) => b.mutualFriendsCount - a.mutualFriendsCount);

        res.json(recommendations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
