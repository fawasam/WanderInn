const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = 5000;
const path = require("path");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const { errorHandler } = require("./middleware/errorHandler");
connectDB();
app.use(errorHandler);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/", require("./uploader"));

app.get("/", (req, res) => {
  res.json("Hello, this is your Node.js app!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`.yellow.underline);
});
