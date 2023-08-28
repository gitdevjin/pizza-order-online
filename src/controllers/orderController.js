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

const displayOrder = async (req, res) => {
    const { user, roles } = req;
    const foundOrder = await Order.find({}).exec();
    if (!foundOrder) return res.status(403).json({ 'success': false, msg: " no order found" });
    console.log(foundOrder);

    res.render('orders', {
        data: foundOrder,
    });
}

module.exports = { handleOrder, displayOrder };