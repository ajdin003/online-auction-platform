const Article = require("../models/articleModel");

exports.createArticle = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const newArticle = await Article.create({
      articleName: req.body.articleName,
      price: req.body.price,
      createdBy: userId,
      condition: req.body.condition,
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
