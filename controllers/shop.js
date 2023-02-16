const { response } = require("express");

exports.getIndex = async (request, response, next) => {
  try {
    response.send("<h1>Home page<h1>");
  } catch (e) {
    response.sendStatus(500);
  }
};
exports.getProducts = async (request, response, next) => {
  try {
    response.render("user/products", {
      pageTitle: "Products",
      path: "/products",
      products: [],
    });
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};
