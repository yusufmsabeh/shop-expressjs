const express = require("express");

const shopController = require("../controllers/admin");
const router = express.Router();
router.get("/add-product", shopController.getAddProducts);
router.post("/add-product", shopController.postAddProducts);

module.exports = router;
