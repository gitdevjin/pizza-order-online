const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    try {
        /*         const authHeader = req.headers.authorization || req.headers.Authorization;
                if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
                const token = authHeader.split(' ')[1]; */
        const token = req.cookies.accessTokenClient;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403); //invalid token
                req.user = decoded.UserInfo.emailId;
                req.roles = decoded.UserInfo.roles;
                next();
            });
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = verifyJWT;