const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  articleName: {
    type: String,
    required: [true, "Article must have name"],
  },
  price: {
    type: Number,
    required: [true, "Article must have price"],
  },
  condition: {
    type: String,
    required: [true, "Article must have condition"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Article must have creator"],
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  image: String,
  highestBid: {
    type: Number,
    default: 0,
  },
});

articleSchema.pre("validate", function (next) {
  if (!this.endDate) {
    this.endDate = new Date(this.startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days later
  }
  next();
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
