const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const articleRouter = require("./routes/articleRouter");
const cors = require("cors");

dotenv.config({ path: "./.env" });

const app = express();
app.use(cors());

app.use(express.json());

const DB = process.env.DATABASE_CONNECTION.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
app.use("/uploads", express.static("uploads"));

app.use("/users", userRouter);
app.use("/articles", articleRouter);

mongoose.connect(DB).then(() => {
  console.log("Database successfully connected.");
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
