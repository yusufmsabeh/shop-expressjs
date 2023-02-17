const { getDb } = require("../database");
const crypto = require("crypto");
exports.fetchProducts = async () => {
  try {
    const products = await getDb().all("SELECT * FROM products");
    console.log(products);
    return products;
  } catch (e) {
    throw e;
  }
};

exports.insertProduct = async (product) => {
  try {
    product.id = crypto.randomUUID();
    await getDb().run(
      "INSERT INTO products VALUES (?,?,?,?,?)",
      product.id,
      product.userId,
      product.title,
      product.description,
      product.price
    );
  } catch (e) {
    console.error(e);
  }
};

exports.getProductById = async (productId) => {
  try {
    return await getDb().get("SELECT * FROM products WHERE id=?", productId);
  } catch (e) {
    throw e;
  }
};

exports.updateProduct = async (product) => {
  try {
    await getDb().run(
      "UPDATE products SET title=?,description=?,price=? WHERE id=?",
      product.title,
      product.description,
      product.price,
      product.id
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};
