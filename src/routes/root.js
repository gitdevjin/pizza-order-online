const express = require('express');
const router = express.Router();
const path = require('path');
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/main.html"))
});

router.get("/pizza", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/pizza.html'));
});

router.get("/salad", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/salad.html'));
});

router.get("/sides", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/sides.html'));
});

router.get("/drink", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/drink.html'));
});

module.exports = router;