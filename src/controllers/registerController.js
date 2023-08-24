const User = require('../models/User');

const createNewUser = async (req, res) => {
    const { email, pwd, firstName, lastName, street, city, province } = req.body;
    if (!email || !pwd || !firstName || !lastName || !street || !city || province === "select")
        return res.status(400).json({ 'success': false, 'message': 'Username and password are required.' });

    //check for duplicate email in the database
    const duplicate = await User.findOne({ emailId: email }).exec();
    if (duplicate) return res.sendStatus(409); //conflict

    try {
        //create and store the new user into mongoDB
        const result = await User.create({
            "emailId": email,
            "password": pwd,
            "userInfo": {
                firstName: firstName,
                lastName: lastName,
                street: street,
                city: city,
                province: province
            }
        });
        console.log(result);
        res.status(201).json({ 'success': true, 'msg': `Welcome!, ${firstName}` })
    } catch (err) {
        res.status(500).json({ 'msg': err.message })
    }
}

module.exports = { createNewUser };