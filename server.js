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

app.use("/", require('./src/routes/root'));
app.use("/signup", require('./src/routes/signup'));
app.use("/signin", require('./src/routes/signin'));




mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
    app.listen(HTTP_PORT, () => {
        console.log(`Server Listening on port ${HTTP_PORT}`);
    })
});