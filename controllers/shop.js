const { response } = require("express");
const productDao = require("../data/DAOs/product-dao");
exports.getIndex = async (request, response, next) => {
  try {
    response.redirect("/products");
  } catch (e) {
    response.sendStatus(500);
  }
};
exports.getProducts = async (request, response, next) => {
  try {
    const products = await productDao.fetchProducts();
    response.render("user/products", {
      pageTitle: "Products",
      path: "/products",
      products: products || [],
    });
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};

exports.getProductDetails = async (request, response, next) => {
  try {
    const productId = request.params.id;
    const product = await productDao.getProductById(productId);
    response.render("user/product-details", {
      pageTitle: product.title || "UNKNOWN",
      path: "none",
      product: product,
    });
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};
