const Article = require("../models/articleModel");

exports.createArticle = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const imagePath = req.file ? req.file.path : null;

    const newArticle = await Article.create({
      articleName: req.body.articleName,
      price: req.body.price,
      createdBy: userId,
      condition: req.body.condition,
      image: imagePath,
    });

    res.status(200).json({
      status: "success",
      data: {
        article: newArticle,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();
    const articlesCount = articles.length;

    res.status(200).json({
      status: "success",
      data: {
        articlesCount,
        articles,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.id;

    if (!articleId) {
      return res.status(400).json({ status: "fail", message: "No article id" });
    }

    const article = await Article.findById(articleId);

    if (!article) {
      return res
        .status(404)
        .json({ status: "fail", message: "No article found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        article,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const articleId = req.params.id;

    if (!articleId) {
      return res.status(400).json({ status: "fail", message: "No article id" });
    }

    await Article.findByIdAndDelete(articleId);

    res.status(204);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.bidOnArticle = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const { bidAmount } = req.body;

    if (!articleId) {
      return res.status(400).json({ status: "fail", message: "No article id" });
    }

    const article = await Article.findById(articleId);

    if (!article) {
      return res
        .status(404)
        .json({ status: "fail", message: "No article found" });
    }

    if (bidAmount <= article.highestBid) {
      return res
        .status(400)
        .json({
          status: "fail",
          message: "Bid amount must be higher than current highest bid",
        });
    }

    article.highestBid = bidAmount;
    await article.save();

    res.status(200).json({
      status: "success",
      data: {
        article,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
