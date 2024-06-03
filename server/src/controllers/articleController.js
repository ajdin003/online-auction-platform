// articleController.js

const Article = require("../models/articleModel");
const User = require("../models/userModel");

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

    res.status(204).end();
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
      return res.status(400).json({
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

exports.buyNow = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    console.log("Received articleId:", articleId);

    const buyerId = req.user.id;
    console.log("Buyer ID:", buyerId);

    const buyer = await User.findById(buyerId);
    console.log("Buyer:", buyer);

    if (!buyer) {
      return res
        .status(404)
        .json({ status: "fail", message: "No buyer found" });
    }

    console.log("Current cart before adding the article:", buyer.cart);

    buyer.cart.push(articleId);
    await buyer.save();

    console.log("Buyer after adding the article to cart:", buyer);

    // Send response
    res.status(200).json({
      status: "success",
      message: "Article successfully purchased and added to cart",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.endAuction = async (req, res, next) => {
  try {
    const articleId = req.params.id;

    const article = await Article.findById(articleId);

    if (!article) {
      return res
        .status(404)
        .json({ status: "fail", message: "No article found" });
    }

    // Add article to highest bidder's cart
    const highestBidderId = article.createdBy;
    const highestBidder = await User.findById(highestBidderId);

    if (!highestBidder) {
      return res
        .status(404)
        .json({ status: "fail", message: "No highest bidder found" });
    }

    highestBidder.cart.push(articleId);
    await highestBidder.save();

    // Remove article from listing
    await Article.findByIdAndDelete(articleId);

    res.status(200).json({
      status: "success",
      message: "Auction ended, item sent to highest bidder's cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getCartItems = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);

    const user = await User.findById(userId).populate("cart");
    console.log("User with populated cart:", user);

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    if (!user.cart) {
      return res.status(200).json({ cartItems: [] });
    }

    const cartItems = user.cart;
    console.log("Cart items:", cartItems);

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
