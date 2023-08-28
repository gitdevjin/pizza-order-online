const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    try {
        const token = req.cookies.accessTokenClient;
        console.log(token);
        if (!token) {
            res.redirect("/signin");
        }

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                console.log(decoded);
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