const { getDb } = require("../database");
const crypto = require("crypto");

exports.getCartId = async (userId) => {
  try {
    const db = getDb();
    let cart = await db.get("SELECT * FROM carts WHERE user_id=?", userId);

    if (!cart) {
      let cartId = crypto.randomUUID();
      cart = await db.run(
        "INSERT INTO carts (id,user_id) VALUES (?,?)",
        cartId,
        userId
      );
      return cartId;
    }
    return cart.id;
  } catch (e) {
    throw e;
  }
};
