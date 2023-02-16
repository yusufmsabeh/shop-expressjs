//External Imports
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// My Imports
const shopRouter = require("./routes/shop");
const { openDatabase } = require("./data/database");
const app = express();
openDatabase();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(shopRouter);

app.listen(3000);
