const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  discountPrice: Number,
  tax: Number,

  image: [String],

  deliveryFee: String,
  description: String,
  Total: Number,
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
