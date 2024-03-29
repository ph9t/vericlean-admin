const express = require("express");
const router = express.Router();
const {
  getStats,
  getTasks,
  setTask,
  updateTask,
  deleteTask,
  deleteTasks,
} = require("../controllers/taskController.js");
const { protect } = require("../middleware/authMiddleware.js");
const { headProtect } = require("../middleware/headAuthMiddleware.js");

router
  .route("/")
  .get(protect, getTasks)
  .post(headProtect, setTask)
  .delete(headProtect, deleteTasks);
router.route("/stats").get(headProtect, getStats);
router
  .route("/:id")
  .put(headProtect, updateTask)
  .delete(headProtect, deleteTask);

module.exports = router;
