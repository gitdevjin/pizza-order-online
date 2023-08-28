const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;


const displayUser = async (req, res) => {
    const { user, roles } = req;
    const foundUser = await User.find({}).exec();
    if (!foundUser) return res.status(403).json({ 'success': false, msg: " no user found" });
    console.log(foundUser);

    const foundUsersPlain = foundUser.map(user => user.toObject());

    res.render('users', {
        data: foundUsersPlain,
    });
}

module.exports = { displayUser };