const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    try {
        const token = req.cookies.accessTokenClient;
        if (!token && req.method === 'GET') {
            res.redirect("/signin");
        } else {
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decoded) => {
                    req.user = decoded.UserInfo.emailId;
                    req.roles = decoded.UserInfo.roles;
                    next();
                });
        }
    } catch (error) {
        next();
    }
}

module.exports = verifyJWT;