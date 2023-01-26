const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/logout", verifyJWT, authController.logout);

module.exports = router;
