const User = require('../models/User');

const handleLogout = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.refreshTokenClient) return res.redirect("/"); // No content
    const refreshToken = cookies.refreshTokenClient;


    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('refreshTokenClient', { httpOnly: false });
        res.clearCookie('accessTokenClient', { httpOnly: false });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    res.clearCookie('refreshTokenClient', { httpOnly: false, secure: true });
    res.clearCookie('accessTokenClient', { httpOnly: false, secure: true });
    res.redirect("/");
}

module.exports = { handleLogout };