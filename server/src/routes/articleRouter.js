const authController = require("../controllers/authController");
const articleController = require("../controllers/articleController");
const express = require("express");

const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file to avoid conflicts
  },
});

const upload = multer({ storage: storage });

router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);

router.post(
  "/create-article",
  upload.single("image"),
  authController.protect,
  articleController.createArticle
);

router.delete("/:id", authController.protect, articleController.deleteArticle);

module.exports = router;
