const productDao = require("../data/DAOs/product-dao");
const userDao = require("../data/DAOs/user-dao");
const cartItemsDao = require("../data/DAOs/cart-items-dao");
exports.getAddProducts = async (request, response, next) => {
  try {
    const productId = request.query.product;
    const product = await productDao.getProductById(productId);

    response.render("admin/add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      product: product,
    });
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};
exports.postAddProducts = async (request, response, next) => {
  try {
    const product = request.body;
    product.userId = request.user.id;
    await productDao.insertProduct(product);
    response.redirect("/admin/add-product");
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};

exports.getAdminProducts = async (request, response, next) => {
  try {
    const userId = request.user.id;
    const products = await userDao.getUserProducts(userId);
    response.render("admin/products", {
      pageTitle: "Your Products",
      path: "/admin/products",
      products: products,
    });
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};

exports.postDeleteProduct = async (request, response, next) => {
  try {
    const productId = request.body.productId;
    await cartItemsDao.removeProductFromAllCarts(productId);
    await userDao.deleteProduct(productId);
    response.redirect("/admin/products");
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};

exports.postEditProduct = async (request, response, next) => {
  try {
    const product = request.body;
    await productDao.updateProduct(product);
    response.redirect("/admin/products");
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};
