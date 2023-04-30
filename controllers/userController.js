const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const sendCookies = require("../utils/sendCookie");
const ErrorHandler = require("../utils/error");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password"); // we can't select password normally
    if (!user) {
      return next(new ErrorHandler("Incorrect email or password!!!", 404));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      sendCookies(user, res, 201, `Welcome Back ${user.name}!!!`);
    } else {
      return next(new ErrorHandler("Incorrect email or password!!!", 404));
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists", 404));
    }
    const hashedPassword = await bcrypt.hash(password, 10); // hashed password
    user = await User.create({ name, email, password: hashedPassword });
    sendCookies(user, res, 201, "Registered Successfully!!!");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({ success: true, message: "Logged out Successfully!!!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
