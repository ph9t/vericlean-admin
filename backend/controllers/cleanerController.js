const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Cleaner = require("../models/cleanerModel.js");

// @desc    Create a cleaner
// @route   POST /api/cleaners
// @access  ?
const registerCleaner = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    contract_start,
    contract_end,
    role,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !contract_start ||
    !contract_end ||
    !role
  ) {
    res.status(400);
    throw new Error("Missing required fields.");
  }

  const cleanerExists = await Cleaner.findOne({ email });

  if (cleanerExists) {
    res.status(400);
    throw new Error("Cleaner already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const cleaner = await Cleaner.create({
    first_name,
    last_name,
    email,
    password: hashedPass,
    contract_start,
    contract_end,
    role,
  });

  if (cleaner) {
    // res.status(201).json({
    //     _id: cleaner.id,
    //     name: cleaner.name,
    //     email: cleaner.email
    // })
    res
      .status(201)
      .json({
        message: `Account for cleaner ${
          first_name + " " + last_name
        } had been created.`,
      });
  } else {
    res.status(400);
    throw new Error("Unable to create an account.");
  }
});

// @desc    Log in a cleaner
// @route   POST /api/cleaners/login
// @access  Public
const loginCleaner = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const cleaner = await Cleaner.findOne({ email });

  if (!cleaner) {
    res.status(400);
    throw new Error("Cleaner does not exist.");
  }

  if (cleaner && (await bcrypt.compare(password, cleaner.password))) {
    const payload = { email: cleaner.email };

    res.json({
      first_name: cleaner.first_name,
      last_name: cleaner.last_name,
      token: jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
      }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials for a Cleaner.");
  }
});

// @desc    Get all Cleaners
// @route   Get /api/cleaners/all
// @access  Private
const allCleaners = asyncHandler(async (req, res) => {
  const cleaners = await Cleaner.find().select("-password");
  res.status(200).json(cleaners);
});

const getStats = asyncHandler(async (req, res) => {
  const cleanerCount = await Cleaner.countDocuments();

  res.status(400).json({
    cleanerCount,
  });
});

// @desc    Get cleaner data
// @route   Get /api/cleaners/me
// @access  Private
const getDetails = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    contract_start,
    contract_end,
    role,
    createdAt,
    updatedAt,
  } = req.cleaner;

  res.status(200).json({
    first_name,
    last_name,
    email,
    contract_start,
    contract_end,
    role,
    created_at: createdAt,
    updated_at: updatedAt,
  });
});

// @desc    Update Cleaner account
// @route   PUT /api/cleaners/id
// @access  Private
const updateCleaner = asyncHandler(async (req, res) => {
  const cleaner = await Cleaner.findById(req.params.id);

  if (!cleaner) {
    res.status(400);
    throw new Error("Cleaner not found in the database.");
  }

  const newBody = ({ first_name, last_name, contract_start, contract_end } =
    req.body);

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    newBody.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedCleaner = await Cleaner.findByIdAndUpdate(
    req.params.id,
    newBody,
    { new: true }
  );

  res.status(200).json({
    first_name: updatedCleaner.first_name,
    last_name: updatedCleaner.last_name,
    contract_start: updatedCleaner.contract_start,
    contract_end: updatedCleaner.contract_end,
  });
});

// @desc    Delete Cleaner account
// @route   PUT /api/cleaners/id
// @access  Private
const deleteCleaner = asyncHandler(async (req, res) => {
  const cleaner = await Cleaner.findById(req.params.id);

  if (!cleaner) {
    res.status(400);
    throw new Error("Cleaner not found in the database.");
  }

  await cleaner.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  registerCleaner,
  loginCleaner,
  allCleaners,
  getStats,
  getDetails,
  updateCleaner,
  deleteCleaner,
};
