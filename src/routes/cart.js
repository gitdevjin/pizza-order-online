const express = require('express');
const router = express.Router();
const path = require('path');
const cartController = require("../controllers/cartController");
const verifyJWT = require("../middleware/verifyJWT");
const User = require('../models/User');

router.put("/", verifyJWT, cartController.deleteCartItem);

router.get("/", verifyJWT, cartController.displayCart);

router.post("/", verifyJWT, cartController.handleCart);
module.exports = router;