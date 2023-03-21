// EXTERNAL IMPORTS
const bcrypt = require("bcryptjs");

// MY IMPORTS
const userDao = require("../data/DAOs/user-dao");
const renderPages = require("../util/render-pages");

exports.getLogin = async (request, response, next) => {
  try {
    renderPages.renderLoginPage(response);
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
      return renderPages.renderLoginPage(response, {
        errorMessages: [
          {
            message: "Account does not exist with this email",
            path: ["email"],
          },
        ],
        email: email,
        password: password,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Password is wrong
      return renderPages.renderLoginPage(response, {
        errorMessages: [{ message: "Wrong Password", path: ["password"] }],
        email: email,
        password: password,
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
    renderPages.renderSignupPage(response);
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};

exports.postSignup = async (request, response, next) => {
  try {
    const { email, userName, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    await userDao.createUser(email, userName, hashedPassword);
    renderPages.renderLoginPage(response, {
      updateMessages: ["Account Created Successfully"],
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
