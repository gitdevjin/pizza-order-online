const express = require("express");
const app = express();
const path = require("path");
const HTTP_PORT = process.env.PORT || 8080;

app.set("views", "./src/views");
app.use(express.static(path.join(__dirname, '/src/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/views/main.html"));
})

app.listen(HTTP_PORT, () => {
    console.log("Server on 8080 port");
})