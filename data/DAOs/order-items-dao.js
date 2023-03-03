const { getDb } = require("../database");
const crypto = require("crypto");
const { getCartId } = require("./cart-dao");
const { getCartItemsWithoutProducts } = require("./cart-items-dao");

exports.fillOrderItems = async (userId, orderId) => {
  try {
    const db = getDb();
    const cartItems = await getCartItemsWithoutProducts(userId);

    for (let i = 0; i < cartItems.length; i++) {
      await db.run(
        "INSERT INTO order_items (order_id,product_id,quantity) VALUES (?,?,?)",
        orderId,
        cartItems[i].product_id,
        cartItems[i].quantity
      );
    }
  } catch (e) {
    throw e;
  }
};
