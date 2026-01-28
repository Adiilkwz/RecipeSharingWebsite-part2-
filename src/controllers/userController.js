const getMe = async (requestAnimationFrame, res) => {
    res.status(200).json(req.user);
};

module.exports = {
    getMe,
};