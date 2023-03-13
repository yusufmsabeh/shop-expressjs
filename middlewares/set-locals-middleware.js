module.exports = async (request, response, next) => {
  try {
    response.locals.isAuthenticated = request.session.isLoggedIn;
    next();
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};
