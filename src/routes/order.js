const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require('../middleware/verifyRoles');
const ROLES = require('../config/roles');

router.get("/", verifyJWT, verifyRoles(ROLES.Admin, ROLES.Manager), orderController.displayOrder);

router.post("/", verifyJWT, verifyRoles(ROLES.User), orderController.handleOrder);

module.exports = router;