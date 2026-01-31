const User = require('../models/user');

const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;

            const updateUser = await user.save();

            res.json({
                _id: updateUser._id,
                username: updateUser.username,
                email: updateUser.email,
                role: updateUser.role,
            });
        } else {
            res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMe,
    updateUserProfile,
};