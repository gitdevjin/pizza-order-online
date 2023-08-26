const Order = require('../models/Order');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleOrder = async (req, res) => {
    const { user, roles } = req;
    const { orders, sum } = req.body;
    try {
        const result = await Order.create({
            "emailId": user,
            "items": orders,
            "sum": sum
        });

        const result2 = await User.updateOne(
            { emailId: user },
            { $set: { cart: [] } }
        )

        res.status(201).json({ 'success': true, 'msg': `Order submitted` });
    } catch (err) {
        res.status(500).json({ 'msg': err.message });
    }
}

module.exports = { handleOrder };