const express = require("express");

const shopController = require("../controllers/shop");
const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/admin/add-product", shopController.getAddProducts);
router.post("/admin/add-product", shopController.postAddProducts);
router.get("/product-details/:id", shopController.getProductDetails);
module.exports = router;
