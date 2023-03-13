module.exports = async (request, response, next) => {
  try {
    if (!request.session.isLoggedIn) {
      return response.render("auth/login", {
        pageTitle: "Login",
        path: "/login",
        errorMessage: "Login first",
        updateMessage: null,
      });
    }
    next();
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};
