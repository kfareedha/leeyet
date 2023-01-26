const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const JWT = require("jsonwebtoken");
const jwt = require("../utils/Token");

const validator = require("email-validator");

exports.signup = async (req, res) => {
  console.log(req.body, "hhhhhh");
  const { email, password, phone, fullname } = req.body;

  try {
    const olduser = await userModel.findOne({ email });
    if (olduser) return res.status(400).json({ message: "user already exist" });
    if (!email || !password || !phone || !fullname)
      return res.status(400).json({ message: "all fields required" });
    const emailvalidation = validator.validate(email);
    if (!emailvalidation)
      return res
        .status(400)
        .json({ message: "plese enter a valid email address" });
    const hash = await bcrypt.hash(password, 10);
    const newUser = new userModel({ email, password: hash, phone, fullname });
    await newUser.save();
    const accessToken = jwt.createAccessToken(newUser._id);
    console.log(accessToken, "token");
    res.status(201).json({ accessToken });
  } catch (error) {
    console.log(error);
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "all fields requied" });
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "invaild username " });
    const result = await bcrypt.compare(password, user.password);
    if (!result) return res.status(401).json({ message: "invaild password" });
    const accessToken = jwt.createAccessToken(user._id);
    console.log(accessToken, "token");

    res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
  }
};
exports.logout = async (req, res) => {
  try {
    const user = await userModel.findOne({ email });
    res.status(200).json({ message: "logout successfull" });
  } catch (error) {
    console.log(error);
  }
};
