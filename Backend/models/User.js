const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    interests: [String], // Optional for common interests
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
