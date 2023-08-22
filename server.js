require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const connectDB = require('./src/config/dbConn');
const HTTP_PORT = process.env.PORT || 8080;

app.set("views", "./src/views");
app.use(express.static(path.join(__dirname, '/src/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/views/main.html"));
});

app.get("/pizza", (req, res) => {
    res.sendFile(path.join(__dirname, '/src/views/pizza.html'));
});

app.get("/salad", (req, res) => {
    res.sendFile(path.join(__dirname, '/src/views/salad.html'));
});

app.get("/sides", (req, res) => {
    res.sendFile(path.join(__dirname, '/src/views/sides.html'));
});

app.get("/drink", (req, res) => {
    res.sendFile(path.join(__dirname, '/src/views/drink.html'));
})

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
    app.listen(HTTP_PORT, () => {
        console.log(`Server Listening on port ${HTTP_PORT}`);
    })
});