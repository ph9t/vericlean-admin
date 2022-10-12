const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Head = require("../models/headModel.js");

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register Head Household
// @route   POST /api/heads/register
// @access  Public
const registerHead = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Missing required fields.");
  }

  const headExists = await Head.findOne({ email });

  if (headExists) {
    res.status(400);
    throw new Error("Head Household already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const head = await Head.create({
    name,
    email,
    password: hashedPass,
    role,
  });

  if (head) {
    res.status(201).json({
      _id: head.id,
      name: head.name,
      email: head.email,
    });
  } else {
    res.status(400);
    throw new Error("Unable to create an account.");
  }
});

// @desc    Login Head Household
// @route   POST /api/heads/login
// @access  Public
const loginHead = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const head = await Head.findOne({ email });

  if (head && (await bcrypt.compare(password, head.password))) {
    const payload = { email: head.email };
    res.json({
      name: head.name,
      token: jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
      }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials for a Head Household.");
  }
});

const headMe = asyncHandler(async (req, res) => {});

module.exports = { loginHead, registerHead, headMe };
