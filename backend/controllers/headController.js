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
  const { first_name, last_name, email, password, role } = req.body;

  if (!first_name || !last_name || !email || !password || !role) {
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
    first_name,
    last_name,
    email,
    password: hashedPass,
    role: role,
  });

  const payload = { email: head.email };

  if (head) {
    res.status(201).json({
      first_name: head.first_name,
      last_name: head.last_name,
      token: signToken(payload),
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
      first_name: head.first_name,
      last_name: head.last_name,
      token: signToken(payload),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials for a Head Household.");
  }
});

const headMe = asyncHandler(async (req, res) => {});

module.exports = { loginHead, registerHead, headMe };
