const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const authController = require("../controllers/authController");
const articleController = require("../controllers/articleController");

router.get("/cart", authController.protect, articleController.getCartItems);
router.post(
  "/create-article",
  upload.single("image"),
  authController.protect,
  articleController.createArticle
);
router.delete("/:id", authController.protect, articleController.deleteArticle);
router.post("/:id/bid", authController.protect, articleController.bidOnArticle);
router.post("/:id/buy-now", authController.protect, articleController.buyNow);
router.post(
  "/:id/end-auction",
  authController.protect,
  articleController.endAuction
);
router.get("/:id", articleController.getArticleById);
router.get("/", articleController.getAllArticles);

module.exports = router;
