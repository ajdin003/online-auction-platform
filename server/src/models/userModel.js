const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "User must have first name"],
  },
  lastName: {
    type: String,
    required: [true, "User must have last name"],
  },
  username: {
    type: String,
    required: [true, "User must have username"],
    minlength: 3,
  },
  password: {
    type: String,
    required: [true, "User must have password"],
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
