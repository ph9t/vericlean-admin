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

const getDetails = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, role, createdAt, updatedAt } = req.head;

  res.status(200).json({
    first_name,
    last_name,
    email,
    role,
    created_at: createdAt,
    updated_at: updatedAt,
  });
});

const updateHead = asyncHandler(async (req, res) => {
  // const head = await Head.findById(req.head.id);
  // console.log(head);

  // if (!head) {
  //   res.status(400);
  //   throw new Error("Head Household not found in the database.");
  // }

  const newBody = ({ first_name, last_name } = req.body);

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    newBody.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedHead = await Head.findByIdAndUpdate(req.head.id, newBody, {
    new: true,
  });

  res.status(200).json({
    first_name: updatedHead.first_name,
    last_name: updatedHead.last_name,
  });
});

const deleteHead = asyncHandler(async (req, res) => {
  // const head = await Head.findById(req.head.id);

  // if (!head) {
  //   res.status(400);
  //   throw new Error("Cleaner not found in the database.");
  // }
  const head_id = req.head.id;
  await req.head.remove();
  res.status(200).json({ id: head_id });
});

module.exports = {
  registerHead,
  loginHead,
  getDetails,
  updateHead,
  deleteHead,
};
