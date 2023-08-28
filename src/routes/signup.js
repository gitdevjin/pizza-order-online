const express = require('express');
const router = express.Router();
const path = require('path');
const registerController = require("../controllers/registerController");

router.get("/", (req, res) => {
    const cookies = req.cookies;
    if (cookies?.refreshTokenClient) return res.sendStatus(204);
    res.sendFile(path.join(__dirname, '../views/logins/signUp.html'));
});

router.post("/", registerController.createNewUser);


module.exports = router;