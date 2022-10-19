const express = require("express");
const router = express.Router();

const {
  registerCleaner,
  loginCleaner,
  allCleaners,
  getStats,
  getDetails,
  updateCleaner,
  deleteCleaner,
} = require("../controllers/cleanerController.js");
// const { protect } = require("../middleware/authMiddleware.js");
const { headProtect } = require("../middleware/headAuthMiddleware.js");
const { cleanerProtect } = require("../middleware/cleanerAuthMiddleware.js");
const { protect } = require("../middleware/authMiddleware.js");

router.post("/", headProtect, registerCleaner);
router.post("/login", loginCleaner);
router.get("/all", headProtect, allCleaners);
router.get("/stats", headProtect, getStats);
router.get("/me", cleanerProtect, getDetails); // tentative
router
  .route("/:id")
  .put(protect, updateCleaner)
  .delete(headProtect, deleteCleaner);

module.exports = router;
