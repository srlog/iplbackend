const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUserEmail = await User.findOne({ where: { email } });
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUserEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    } else if (existingUsername) {
      return res
        .status(400)
        .json({ message: "User with this username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((e) => e.message),
      });
    }
    res.status(500).json({ message: "Server error during registration" });
  }
};

const bulkRegister = async (req, res) => {
  try {
    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: "Please provide an array of users" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newUsers = [];

    for (const { username, email, password } of users) {
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields for each user" });
      }

      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: `Invalid email format for user ${username}` });
      }

      const existingUserEmail = await User.findOne({ where: { email } });
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUserEmail) {
        return res.status(400).json({ message: `User with email ${email} already exists` });
      } else if (existingUsername) {
        return res.status(400).json({ message: `User with username ${username} already exists` });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      newUsers.push({
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      });
    }

    res.status(201).json({
      message: "Users registered successfully",
      users: newUsers,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((e) => e.message),
      });
    }
    res.status(500).json({ message: "Server error during bulk registration" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = {
  register,
  login,
  bulkRegister
};
