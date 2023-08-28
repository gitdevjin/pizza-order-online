require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const connectDB = require('./src/config/dbConn');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./src/middleware/verifyJWT');
const HTTP_PORT = process.env.PORT || 8080;

app.use(cookieParser());

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '/src/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/order", require('./src/routes/order'));
app.use("/cart", require('./src/routes/cart'));
app.use("/signup", require('./src/routes/signup'));
app.use("/signin", require('./src/routes/signin'));
app.use("/signout", require('./src/routes/signout'));
app.use("/", require('./src/routes/root'));
app.use("/refresh-token", require('./src/routes/refreshToken'));
app.use("/manage", require('./src/routes/manage'));


mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
    app.listen(HTTP_PORT, () => {
        console.log(`Server Listening on port ${HTTP_PORT}`);
    })
});