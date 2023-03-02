const { getDb } = require("../database");
const crypto = require("crypto");
const { getCartId } = require("./cart-dao");

exports.addProduct = async (userId, productId) => {
  try {
    const db = getDb();
    const cartId = await getCartId(userId);
    const productInCart = await db.get(
      "SELECT * FROM cart_items WHERE cart_id=? AND product_id = ? ",
      cartId,
      productId
    );
    if (!productInCart) {
      await db.run(
        "INSERT INTO cart_items VALUES (?,?,?) ",
        cartId,
        productId,
        1
      );
    } else {
      await db.run(
        "UPDATE cart_items SET quantity=quantity+1  WHERE cart_id=? AND product_id=? ",
        cartId,
        productId
      );
    }
  } catch (e) {
    throw e;
  }
};

exports.removeProduct = async (userId, productId) => {
  try {
    const db = getDb();
    const cartId = await getCartId(userId);
    const productInCart = await db.get(
      "SELECT * FROM cart_items WHERE cart_id=? AND product_id=?",
      cartId,
      productId
    );
    if (productInCart.quantity <= 1) {
      await db.run(
        "DELETE FROM cart_items WHERE cart_id=? AND product_id=?",
        cartId,
        productId
      );
    } else {
      await db.run(
        "UPDATE cart_items SET quantity=? WHERE cart_id=? AND product_id=? ",
        productInCart.quantity - 1,
        cartId,
        productId
      );
    }
  } catch (e) {
    throw e;
  }
};

exports.getCartItems = async (userId) => {
  try {
    const db = getDb();
    const cartId = await getCartId(userId);
    let cartItems = await db.all(
      "SELECT id,user_id,title,description,price,quantity FROM cart_items join products on cart_items.product_id=products.id where cart_id=?",
      cartId
    );
    console.log(cartItems);
    return cartItems;
  } catch (e) {
    throw e;
  }
};
exports.getTotalPrice = async (userId) => {
  try {
    const db = getDb();
    const cartId = await getCartId(userId);
    const totalPrice = await db.get(
      "SELECT SUM(price*quantity) as total_price from cart_items join products on cart_items.product_id=products.id WHERE cart_id=?;",
      cartId
    );
    return totalPrice.total_price;
  } catch (e) {
    throw e;
  }
};
