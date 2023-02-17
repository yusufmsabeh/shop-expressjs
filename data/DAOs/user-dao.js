const { getDb } = require("../database");

exports.getUserProducts = async (id) => {
  try {
    const products = await getDb().all(
      "SELECT * FROM products WHERE user_id=?",
      id
    );
    return products;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

exports.deleteProduct = async (productId) => {
  try {
    await getDb().run("DELETE FROM products WHERE id =?", productId);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
