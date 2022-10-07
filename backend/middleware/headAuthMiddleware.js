const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Head = require("../models/headModel.js");

const headProtect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const head = await Head.findOne({ email: decoded.email }).select(
        "-password"
      );

      if (!head) {
        throw new Error();
      }

      req.head = head;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("User not authorized.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized because no token sent in headers.");
  }
});

module.exports = { headProtect };
