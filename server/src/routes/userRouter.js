// userRouter.js
const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router
  .route("/current")
  .get(authController.protect, userController.getCurrentUser);

router.route("/").get(userController.getAllUsers);
router.route("/:id").get(authController.protect, userController.getUserById);

module.exports = router;
