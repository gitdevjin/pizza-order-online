const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.status(403).json({ 'success': false, 'location': "/signin", msg: "not Authorized" });
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.status(403).json({ 'success': false, 'location': "/signin", msg: "not Authorized" });
        req.isLoggedIn = true;
        next();
    }
}

module.exports = verifyRoles;