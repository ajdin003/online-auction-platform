const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

const DB = process.env.DATABASE_CONNECTION.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

app.use("/users", userRouter);

mongoose.connect(DB).then(() => {
  console.log("Database connection established.");
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
