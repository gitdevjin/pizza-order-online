const express = require('express');
const router = express.Router();
const path = require('path');
const loginController = require("../controllers/loginController");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/logins/signIn.html'));
});

router.post("/", loginController.handleLogin);
module.exports = router;