const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    emailId: {
        type: String,
        required: true
    },
    items: [
        {
            itemName: String,
            size: String,
            quantity: Number,
            price: Number,
        },
    ],
    sum: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
