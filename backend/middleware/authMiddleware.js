const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Cleaner = require("../models/cleanerModel.js");
const Head = require("../models/headModel.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const cleaner = await Cleaner.findOne({ email: decoded.email }).select(
        "-password"
      );

      if (!cleaner) {
        req.who = "head";
        req.head = await Head.findOne({ email: decoded.email }).select(
          "-password"
        );
      } else {
        req.who = "cleaner";
        req.cleaner = cleaner;
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("User not authorized.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized because no token sent in headers.");
  }
});

module.exports = { protect };
