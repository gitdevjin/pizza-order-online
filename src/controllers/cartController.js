const User = require('../models/User');
const jwt = require('jsonwebtoken');


const handleCart = async (req, res) => {
    const { itemName, size, price, quantity } = req.body;
    const { user, roles } = req;
    const foundUser = await User.findOne({ emailId: user }).exec();
    if (!foundUser) return res.status(403).json({ 'success': false, msg: "user not found" }); //Unauthorized

    const item = {
        itemName: itemName,
        size: size,
        quantity: quantity,
        price: price,
    }
    foundUser.cart.push(item);
    try {
        const result = await foundUser.save();
        console.log(result);
        res.status(200).json({ 'success': true, itemName: itemName, size: size });
    } catch {
        res.status(500).json({ 'success': false });
    }
}

const displayCart = async (req, res) => {
    const { user, roles } = req;
    const foundUser = await User.findOne({ emailId: user }).exec();
    if (!foundUser) return res.status(403).json({ 'success': false, msg: "user not found" }); //Unauthorized



    const items = foundUser.cart

    items.forEach(item => {
        switch (item.itemName) {
            case "Super Deluxe Pizza":
                item.src = "pizza1.jpg";
        }
        switch (item.itemName) {
            case "Gorgonzola Pizza":
                item.src = "cheese-pizza.jpg";
        }
        switch (item.itemName) {
            case "Pepperoni Pizza":
                item.src = "pepperoni-pizza.jpg";
        }
        switch (item.itemName) {
            case "Fresh Pizza":
                item.src = "fresh-pizza.jpg";
        }
        switch (item.itemName) {
            case "Shrimp Pizza":
                item.src = "shrimp-pizza.jpg";
        }
        switch (item.itemName) {
            case "The Meats Pizza":
                item.src = "meat-pizza.jpg";
        }
        switch (item.itemName) {
            case "Greek Salad":
                item.src = "greek-salad.jpg";
        }
        switch (item.itemName) {
            case "Caeser Salad":
                item.src = "caeser-salad.jpg";
        }
        switch (item.itemName) {
            case "Chicken Salad":
                item.src = "chicken-salad.jpg";
        }
        switch (item.itemName) {
            case "Ricotta Salad":
                item.src = "ricotta-salad.jpg";
        }
        switch (item.itemName) {
            case "Chicken Wing":
                item.src = "wing.jpg";
        }
        switch (item.itemName) {
            case "French Fries":
                item.src = "fries.jpg";
        }
        switch (item.itemName) {
            case "Coke Zero":
                item.src = "coke.jpg";
        }
        switch (item.itemName) {
            case "Ginger Ale":
                item.src = "ginger-ale.jpg";
        }
    })

    res.render('cart', {
        data: items,
    });
}

module.exports = { handleCart, displayCart };