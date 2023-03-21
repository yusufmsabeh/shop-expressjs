// EXTERNAL IMPORTS
const bcrypt = require("bcryptjs");

// MY IMPORTS
const userDao = require("../data/DAOs/user-dao");

exports.getLogin = async (request, response, next) => {
  try {
    response.render("auth/login", {
      pageTitle: "Login",
      path: "/login",
      errorMessage: null,
      updateMessage: null,
    });
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};

exports.postLogin = async (request, response, next) => {
  try {
    const email = request.body.email;
    const password = request.body.password;
    const user = await userDao.getUserByEmail(email);
    if (!user) {
      // No Account with this email
      return response.render("auth/login", {
        pageTitle: "Login",
        path: "/login",
        errorMessage: "Account does not exist with this email",
        updateMessage: null,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Password is wrong
      return response.render("auth/login", {
        pageTitle: "Login",
        path: "/login",
        errorMessage: "Password is wrong",
        updateMessage: null,
      });
    }

    request.session.isLoggedIn = true;
    request.session.userId = user.id;

    response.redirect("/");
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};

exports.getSignup = async (request, response, next) => {
  try {
    response.render("auth/signup", {
      pageTitle: "Signup",
      path: "/signup",
      errorMessage: null,
      updateMessage: null,
    });
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};

exports.postSignup = async (request, response, next) => {
  try {
    const { email, userName, password } = request.body;
    const user = await userDao.getUserByEmail(email);
    if (user) {
      // Account already exits with this email
      return response.render("auth/signup", {
        pageTitle: "Signup",
        path: "/signup",
        errorMessage: "Account exits with this email",
        updateMessage: null,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await userDao.createUser(email, userName, hashedPassword);
    response.render("auth/login", {
      pageTitle: "Login",
      path: "/login",
      errorMessage: null,
      updateMessage: "Account created successfully",
    });
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};

exports.getLogout = async (request, response, next) => {
  try {
    await request.session.destroy();
    response.redirect("/login");
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};
