const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userInfo: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
    },
    roles: {
        User: {
            type: Number,
            default: 3333
        },
        Editor: {
            type: Number,
        },
        Admin: {
            type: Number,
        }
    },
    cart: [
        {
            itemName: String,
            size: String,
            quantity: Number,
            price: Number,
        }
    ],
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);
//User is the name of collection in mongoDB;