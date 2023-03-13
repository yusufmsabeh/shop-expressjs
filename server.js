//External Imports
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const mongodbSessions = require("connect-mongodb-session")(session);

// My Imports
const shopRouter = require("./routes/shop");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const { openDatabase } = require("./data/database");

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const store = new mongodbSessions({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);
openDatabase();
app.use(async (request, response, next) => {
  response.locals.isAuthenticated = request.session.isLoggedIn;
  next();
});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(authRouter);
app.use(shopRouter);
app.use("/admin", adminRouter);

app.listen(3000);
