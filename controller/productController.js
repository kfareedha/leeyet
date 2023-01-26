const productModel = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};
exports.createProducts = async (req, res) => {
  try {
    const {
      name,
      price,

      description,
      deliveryFee,
    } = req.body;
    const image = req.files.map((e) => e.filename);
    if (!name || !price || !description || !deliveryFee)
      return res.status(400).json({ message: "all fields required" });
    const discountPrice = price * 0.02;
    const Total = price - discountPrice + deliveryFee;
    const newProduct = new productModel({
      name,
      price,
      discountPrice,
      Total,
      image,
      deliveryFee,
      description,
    });
    await newProduct.save();
    res.status(201).json({ message: "product added successfully" });
  } catch (error) {
    console.log(error);
  }
};
exports.getAProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    const image = req.files.map((e) => e.filename);
    if (!product) {
      return res.status(400).json({ message: "Invalid id." });
    }
    const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      image: image,
      price: req.body.price,
      deliveryFee: req.body.deliveryFee,
    });
    res.json({ updatedProduct });
  } catch (error) {
    res;
    console.log(error);
  }
};
exports.deleteAProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ message: "Invalid id." });
    }
    await product.remove();
    res.json({ message: "Successfully deleted." });
  } catch (error) {
    console.log(error);
  }
};
