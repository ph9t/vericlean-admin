const express = require("express");
const router = express.Router();

const { headProtect } = require("../middleware/headAuthMiddleware.js");
const { protect } = require("../middleware/authMiddleware.js");

const {
  getFeedback,
  updateFeedback,
} = require("../controllers/feedbackController.js");

router
  .route("/:id")
  .get(protect, getFeedback)
  .put(headProtect, updateFeedback);

module.exports = router;
