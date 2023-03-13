const { getDb } = require("../database");
const crypto = require("crypto");
const { getCartItems } = require("./cart-items-dao");

exports.fillOrderItems = async (userId, orderId) => {
  try {
    const db = getDb();
    const cartItems = await getCartItems(userId);
    for (let i = 0; i < cartItems.length; i++) {
      await db.run(
        "INSERT INTO order_items (order_id,title,description,price,quantity) VALUES (?,?,?,?,?)",
        orderId,
        cartItems[i].title,
        cartItems[i].description,
        cartItems[i].price,
        cartItems[i].quantity
      );
    }
  } catch (e) {
    throw e;
  }
};

exports.getOrderItems = async (orderId) => {
  try {
    const db = getDb();

    let orderItems = await db.all(
      "SELECT * FROM order_items where order_id=?",
      orderId
    );
    console.log(orderItems);
    return orderItems;
  } catch (e) {
    throw e;
  }
};
