exports.getIndex = async (request, response, next) => {
  try {
    response.send("<h1>Home page<h1>");
  } catch (e) {
    response.sendStatus(500);
  }
};
