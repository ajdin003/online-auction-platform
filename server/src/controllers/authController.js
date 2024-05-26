const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json("User already exists");
    }

    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(404).json("Missing field!");
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json("User does not exist!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json("Invalid password!");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({
      status: "success",
      token,
      userID: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.protect = async (req, res, next) => {
  console.log(req.headers);
  let token;
  // 1) Get token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(404).json("No token!");
  }

  // 2) Verification token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return res.status(400).json("User does not exist!");
    }
    req.user = freshUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json("Invalid token!");
  }
};
