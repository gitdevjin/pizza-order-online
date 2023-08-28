const express = require('express');
const router = express.Router();
const path = require('path');
const manageController = require("../controllers/manageController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require('../middleware/verifyRoles');
const User = require('../models/User');
const ROLES = require('../config/roles');


router.get("/", verifyJWT, verifyRoles(ROLES.Admin, ROLES.Manager), manageController.displayUser);


module.exports = router;