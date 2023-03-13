const userDao = require("../data/DAOs/user-dao");

module.exports = async (request, response, next) => {
  try {
    const userId = request.session.userId;
    const user = await userDao.getUserById(userId);
    request.user = user;

    next();
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};
