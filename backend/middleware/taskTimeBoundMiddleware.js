const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel.js");

const boundTask = asyncHandler(async (req, res, next) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Route requires task 'id' parameter.");
  }

  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error(`Task with 'id' of ${req.params.id} does not exist.`);
  }

  const now_time = new Date();

  if (
    !(
      now_time.valueOf() >= task.start_time.valueOf() &&
      now_time.valueOf() <= task.end_time.valueOf()
    )
  ) {
    res.status(400);
    throw new Error("The scheduled task is now closed.");
  }

  next();
});

module.exports = { boundTask };
