const { getDb } = require("../database");
const crypto = require("crypto");
exports.createUser = async (email, name, password) => {
  try {
    const id = crypto.randomUUID();
    await getDb().run(
      "INSERT INTO users (id,email,name,password) VALUES (?,?,?,?)",
      id,
      email,
      name,
      password
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const user = await getDb().get("SELECT * FROM users WHERE  email=?", email);
    return user;
  } catch (e) {
    throw e;
  }
};

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
