const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    sendFriendRequest,
    getIncomingRequests,
    respondToFriendRequest,
    getFriends,
    unfriend,
    searchUsers,
    getRecommendations,
} = require('../controllers/friendController');

// @route   POST /api/friends/request
// @desc    Send friend request
// @access  Private
router.post('/request', auth, sendFriendRequest);

// @route   GET /api/friends/requests
// @desc    Get incoming friend requests
// @access  Private
router.get('/requests', auth, getIncomingRequests);

// @route   POST /api/friends/respond
// @desc    Accept or reject friend request
// @access  Private
router.post('/respond', auth, respondToFriendRequest);

// @route   GET /api/friends
// @desc    Get friends list
// @access  Private
router.get('/', auth, getFriends);

// @route   DELETE /api/friends/:friendId
// @desc    Unfriend a user
// @access  Private
router.delete('/:friendId', auth, unfriend);

// @route   GET /api/friends/search?q=
// @desc    Search users
// @access  Private
router.get('/search', auth, searchUsers);

// @route   GET /api/friends/recommendations
// @desc    Get friend recommendations
// @access  Private
router.get('/recommendations', auth, getRecommendations);

module.exports = router;
