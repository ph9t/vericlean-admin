const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Cleaner = require("../models/cleanerModel.js");

const cleanerProtect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === "cleaner") {
      req.cleaner = await Cleaner.findById(decoded._id).select("-password");
      next();
    } else {
      res.status(401);
      throw new Error("User not authorized.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized because no token sent in headers.");
  }
});

module.exports = { cleanerProtect };
