const session = require("express-session");
const mongodbSessions = require("connect-mongodb-session")(session);
const dotenv = require("dotenv");
dotenv.config();
const store = new mongodbSessions({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

module.exports = session({
  secret: process.env.SESSION_SECRET,
  store: store,
  resave: false,
  saveUninitialized: false,
});
