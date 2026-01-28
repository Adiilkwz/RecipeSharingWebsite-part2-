const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        Type: String,
        required: [true, 'Please add a username']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);