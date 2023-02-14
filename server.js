//External Imports
const express = require("express");
const bodyParser = require("body-parser");

// My Imports
const shopRouter = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(shopRouter);
app.listen(3000);
