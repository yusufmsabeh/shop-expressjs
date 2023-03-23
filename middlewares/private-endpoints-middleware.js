const renderPages = require("../util/render-pages");

module.exports = async (request, response, next) => {
  try {
    if (!request.session.isLoggedIn) {
      return renderPages.renderLoginPage(response, {
        errorMessages: [{ message: "Login first", path: ["none"] }],
      });
    }
    next();
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};
