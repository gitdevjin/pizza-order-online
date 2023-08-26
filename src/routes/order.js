const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyJWT = require("../middleware/verifyJWT");
const User = require('../models/Order');

//router.get("/", verifyJWT, orderController.handleOrder);

router.post("/", verifyJWT, orderController.handleOrder);

module.exports = router;