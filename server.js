//External Imports
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// My Imports
const shopRouter = require("./routes/shop");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const { openDatabase } = require("./data/database");

// middlewares
const sessionMiddleware = require("./middlewares/session-middleware");
const setLocalsMiddleware = require("./middlewares/set-locals-middleware");
const authorizationMiddleware = require("./middlewares/authorization-middleware");
dotenv.config();
const app = express();
app.use(() => {
  console.log("request received Shop js");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sessionMiddleware);
app.use(authorizationMiddleware);
openDatabase();
app.use(setLocalsMiddleware);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(authRouter);
app.use(shopRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT);
