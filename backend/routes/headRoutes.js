const express = require("express");
const router = express.Router();
const {
  loginHead,
  registerHead,
  updateHead,
  deleteHead,
  getDetails,
} = require("../controllers/headController.js");
const { headProtect } = require("../middleware/headAuthMiddleware");

router.post("/login", loginHead);
router.post("/register", registerHead);
router.get("/me", headProtect, getDetails);
router.route("/").put(headProtect, updateHead).delete(headProtect, deleteHead);

module.exports = router;
