//External Imports
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// My Imports
const shopRouter = require("./routes/shop");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(shopRouter);
app.listen(3000);
