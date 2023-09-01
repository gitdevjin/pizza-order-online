const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cartController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require('../middleware/verifyRoles');
const ROLES = require('../config/roles');

router.put("/", verifyJWT, verifyRoles(ROLES.User), cartController.deleteCartItem);

router.get("/", verifyJWT, verifyRoles(ROLES.User), cartController.displayCart);

router.post("/", verifyJWT, verifyRoles(ROLES.User), cartController.handleCart);
module.exports = router;