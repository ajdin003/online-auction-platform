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
    // Handle errors
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
