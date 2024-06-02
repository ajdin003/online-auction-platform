const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "No users found" });
    }

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ status: "fail", message: "No user found" });
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "No user found with that id!" });
    }

    res.status(200).json({ status: "success", data: { user } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
