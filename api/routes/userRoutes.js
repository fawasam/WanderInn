const express = require("express");
const router = express.Router();
const {
  registerUser,
  verifyEmail,
  verifySms,
  loginUser,
  getMe,
  logoutUser,
} = require("../controllers/userController.js");

router.post("/register", registerUser);
router.get("/profile", getMe);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.post("/verify-email/:token", verifyEmail);
router.post("/verify-sms", verifySms);
module.exports = router;
