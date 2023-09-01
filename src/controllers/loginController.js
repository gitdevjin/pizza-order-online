const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ emailId: email }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized

    //evaluate password
    const match = foundUser.password === pwd;
    if (match) {
        const roles = Object.values(foundUser.roles);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "emailId": foundUser.emailId,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { "emailId": foundUser.emailId },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('accessTokenClient', accessToken, {
            secure: true,
            httpOnly: false,
        });

        res.cookie('refreshTokenClient', refreshToken, {
            secure: true,
            httpOnly: false,
        });

        res.status(200).json({ 'success': true, 'refreshToken': refreshToken, 'msg': `Welcome!, ${foundUser.userInfo.firstName}` });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };