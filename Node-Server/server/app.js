require("dotenv").config();

var express = require('express');
var app = express(); 
var sequelize = require("./db");
var bodyParser = require("body-parser");
var user = require("./controllers/user-controller");
var character = require("./controllers/character-controller");
var faction = require("./controllers/faction-controller")


sequelize.sync()
app.use(require("./middleware/headers"));
app.use(bodyParser.json());
app.use("/user", user)
app.use(require("./middleware/validate-session"))
app.use("/character", character)
app.use("/faction", faction)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on PORT ${process.env.PORT}`) //5
});

