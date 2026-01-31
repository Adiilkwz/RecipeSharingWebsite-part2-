const express = require('express');
const router = express.Router();

const { getMe, updateUserProfile } = require('../controllers/userController');

const{ protect } = require('../middleware/authMiddleware');

router.get('/me', protect, getMe);

router.put('/profile', protect, updateUserProfile);

module.exports = router;