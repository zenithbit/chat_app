const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email: email });

    if (user) {
      return res.status(400).send("Email is already in use");
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ message: "Please enter a stronger password" });
    }

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email: email });

    if (!user) return res.status(400).send("Invalid username or password");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(400).send("Invalid username or password");

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (err) {
    res.status(404).send("error: " + err.message);
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(404).send("error: " + err.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(404).send("error: " + err.message);
  }
};
module.exports = {
  registerUser,
  loginUser,
  findUser,
  getUsers,
};
