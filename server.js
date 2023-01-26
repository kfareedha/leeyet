const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(morgan("tiny"));
const connectDB = require("./config/db.js");
const productRoute = require("./routes/productRoutes");
const authRoute = require("./routes/auth");

const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/leeyet/product", productRoute);
app.use("/api/leeyet/auth", authRoute);

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});
