const express = require("express");
const privateEndpoints = require("../middlewares/private-endpoints-middleware");
const adminController = require("../controllers/admin");
const router = express.Router();
router.use(privateEndpoints);
router.get("/add-product", adminController.getAddProducts);
router.post("/add-product", adminController.postAddProducts);
router.get("/products", adminController.getAdminProducts);
router.post("/delete-product", adminController.postDeleteProduct);
router.post("/edit-product", adminController.postEditProduct);

module.exports = router;
