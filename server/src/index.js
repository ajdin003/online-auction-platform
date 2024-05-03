const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();

app.use("/", (req, res) => {
  res.send("Online Auction Platform Server");
});

const DB = process.env.DATABASE_CONNECTION.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("Database connection established.");
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
