const express = require("express");
const authController = require("../controllers/auth");
const loginRequestValidator = require("../validation/login-request-validation");
const signupRequestValidator = require("../validation/signup-request-validation");
const router = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", loginRequestValidator, authController.postLogin);

router.get("/signup", authController.getSignup);
router.post("/signup", signupRequestValidator, authController.postSignup);

router.get("/logout", authController.getLogout);

module.exports = router;
