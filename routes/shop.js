const express = require("express");

const shopController = require("../controllers/shop");
const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.post("/cart", shopController.postCart);
router.get("/cart", shopController.getCart);
router.post("/remove-cart", shopController.removeCart);
router.get("/product-details/:id", shopController.getProductDetails);

router.get("/checkout", shopController.getCheckOut);
router.post("/checkout", shopController.postCheckOut);

router.get("/orders", shopController.getOrders);
module.exports = router;
