const User = require('../models/User');
const jwt = require('jsonwebtoken');


const handleRefreshToken = async (req, res) => {

    const refreshToken = req.body.refreshToken;
    console.log(refreshToken + "logout router")
    if (!refreshToken) return res.sendStatus(201);
    const foundUser = await User.findOne({ refreshToken }).exec();
    console.log(foundUser + "logout router")
    if (!foundUser) return res.sendStatus(404); //Unauthorized

    //evaluate password
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.emailId !== decoded.emailId) return res.sendStatus(403);

            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "emailId": decoded.emailId,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '120s' }
            );

            res.cookie('accessTokenClient', accessToken, {
                secure: true,
                httpOnly: false,
            });

            res.status(200).json({ 'success': true, 'refreshToken': refreshToken });
        }
    )

}

module.exports = { handleRefreshToken };