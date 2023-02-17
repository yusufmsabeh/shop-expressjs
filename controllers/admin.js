const productDao = require("../data/DAOs/product-dao");

exports.postAddProducts = async (request, response, next) => {
  try {
    const product = request.body;
    product.userId = 1;
    await productDao.insertProduct(product);
    response.redirect("/admin/add-product");
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};

exports.getAddProducts = async (request, response, next) => {
  try {
    response.render("user/add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
    });
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};
