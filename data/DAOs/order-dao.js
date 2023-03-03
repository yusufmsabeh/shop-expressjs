const { getDb } = require("../database");
const { fillOrderItems } = require("./order-items-dao");
const { deleteCartItems, getTotalPrice } = require("./cart-items-dao");
const crypto = require("crypto");

exports.createOrder = async (userId, title) => {
  try {
    const db = getDb();
    const orderId = crypto.randomUUID();
    const totalPrice = await getTotalPrice(userId);
    await db.run(
      "INSERT INTO orders (id,user_id,title,total_price) VALUES (?,?,?,?)",
      orderId,
      userId,
      title,
      totalPrice
    );
    await fillOrderItems(userId, orderId);
    await deleteCartItems(userId);
  } catch (e) {
    throw e;
  }
};

exports.getOrders = async (userId) => {
  try {
    const db = getDb();
    const orders = await db.all(
      "SELECT * FROM orders WHERE user_id =?",
      userId
    );
    return orders;
  } catch (e) {
    throw e;
  }
};
