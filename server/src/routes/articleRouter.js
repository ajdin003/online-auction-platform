const authController = require("../controllers/authController");
const articleController = require("../controllers/articleController");
const express = require("express");

const router = express.Router();

router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);

router.post(
  "/create-article",
  authController.protect,
  articleController.createArticle
);

module.exports = router;
