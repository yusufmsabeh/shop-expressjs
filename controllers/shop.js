const productDao = require("../data/DAOs/product-dao");
const cartItemsDao = require("../data/DAOs/cart-items-dao");
const orderDao = require("../data/DAOs/order-dao");
const orderItemsDao = require("../data/DAOs/order-items-dao");
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
      user: request.user || undefined,
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

exports.postCart = async (request, response, next) => {
  try {
    const productId = request.body.productId;
    const userId = request.user.id;
    await cartItemsDao.addProduct(userId, productId);
    response.redirect("/cart");
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};

exports.getCart = async (request, response, next) => {
  try {
    const userId = request.user.id;
    const cartItems = await cartItemsDao.getCartItems(userId);
    const totalPrice = await cartItemsDao.getTotalPrice(userId);
    response.render("user/cart", {
      pageTitle: "Cart",
      path: "/cart",
      cart: { products: cartItems, totalPrice: totalPrice || 0 },
    });
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};

exports.removeCart = async (request, response, next) => {
  try {
    const userId = request.user.id;
    const productId = request.body.productId;

    await cartItemsDao.removeProduct(userId, productId);
    response.redirect("/cart");
  } catch (e) {
    response.sendStatus(500);
  }
};

exports.getCheckOut = async (request, response, next) => {
  try {
    response.render("user/checkout", {
      pageTitle: "Checkout",
      path: "/checkout",
    });
  } catch (e) {
    response.sendStatus(500);
  }
};

exports.postCheckOut = async (request, response, next) => {
  try {
    const userId = request.user.id;
    const orderTitle = request.body.orderTitle;
    await orderDao.createOrder(userId, orderTitle);
    response.redirect("/orders");
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};

exports.getOrders = async (request, response, next) => {
  try {
    const userId = request.user.id;
    const orders = await orderDao.getOrders(userId);
    response.render("user/orders", {
      pageTitle: "orders",
      path: "/orders",
      orders: orders,
    });
  } catch (e) {
    response.sendStatus(e);
  }
};

exports.getOrderDetails = async (request, response, next) => {
  try {
    const orderId = request.params.orderId;
    const order = await orderDao.getOrder(orderId);
    const orderItems = await orderItemsDao.getOrderItems(orderId);
    response.render("user/order-details", {
      pageTitle: order.title,
      path: "/order-details",
      order: { products: orderItems, totalPrice: order.total_price },
    });
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
};
