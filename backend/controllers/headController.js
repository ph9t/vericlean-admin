const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Head = require("../models/headModel.js");

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

module.exports = { loginHead, registerHead, headMe };
