const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel.js");
const Head = require("../models/headModel.js");
const CleanerLog = require("../models/cleanerLogModel.js");
const Video = require("../models/videoModel.js");
const QuickR = require("../models/qrModel.js");
const Feedback = require("../models/feedbackModel.js");
const mongoose = require("mongoose");

// @desc    Create a scheduled task
// @route   POST /api/tasks
// @access  Private
const setTask = asyncHandler(async (req, res) => {
  if (
    !req.body.cleaners_assigned ||
    !req.body.cleaning_tasks ||
    // !req.body.task_head ||
    !req.body.room ||
    !req.body.floor ||
    !req.body.start_time ||
    !req.body.end_time
  ) {
    res.status(400);
    throw new Error("Missing required fields.");
  }

  // console.log(req.body.cleaners_assigned.length)
  // console.log(new Date(req.body.start_time).toString())

  const task = await Task.create({
    cleaners_assigned: req.body.cleaners_assigned,
    cleaning_tasks: req.body.cleaning_tasks,
    head_household_id: req.head._id,
    more_instructions: req.body.more_instructions,
    room: req.body.room,
    floor: req.body.floor,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  });

  // create feedback document
  const feedback = await Feedback.create({
    scheduled_task_id: task.id,
    head_household_id: req.head._id,
  });

  // check if only a single cleaner is assigned or otherwise
  let cleaner_ids = [];
  if (
    typeof req.body.cleaners_assigned === "string" ||
    req.body.cleaners_assigned instanceof String
  ) {
    cleaner_ids.push(req.body.cleaners_assigned);
  } else {
    cleaner_ids.push(...req.body.cleaners_assigned);
  }

  // create CleanerLog documents for each Cleaners assigned in a task
  let cleaner_log_ids = [];
  for (let i = 0; i < cleaner_ids.length; i++) {
    const video = await Video.create({ cleaner_id: cleaner_ids[i] });
    const quickr = await QuickR.create({ cleaner_id: cleaner_ids[i] });
    const cleaner_log = await CleanerLog.create({
      cleaner_id: cleaner_ids[i],
      scheduled_task_id: task._id,
      video_id: video._id,
      qr_log_id: quickr._id,
    });

    cleaner_log_ids.push(cleaner_log.id);
  }

  finalTask = await Task.findByIdAndUpdate(
    task.id,
    {
      cleaner_log_ids: cleaner_log_ids,
    },
    { new: true }
  );
  res.status(200).json(finalTask);
});

// @desc    Get scheduled tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  let tasks;

  if (req.who === "head") {
    tasks = await Task.find({ head_household_id: req.head._id });
  } else if (req.who === "cleaner") {
    tasks = await Task.find({ cleaners_assigned: req.cleaner._id });
  }
  res.status(200).json(tasks);
});

const getStats = asyncHandler(async (req, res) => {
  const taskCount = await Task.countDocuments();

  const openCount = await Task.countDocuments({
    start_time: { $gt: new Date() },
  });

  const ongoing = await Task.countDocuments({
    start_time: { $lt: new Date() },
    end_time: { $gt: new Date() },
  });

  const closedCount = await Task.countDocuments({
    end_time: { $lt: new Date() },
  });

  // const usersCount = await User.countDocuments({
  //   created_at: { $lt: new Date('2019-01-01'), $gt: new Date('2020-01-01') }
  // });

  res.status(200).json({
    taskCount,
    openCount,
    ongoing,
    closedCount,
  });
});

// @desc    Update a scheduled task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found in the database.");
  }

  const head = await Head.findById(req.head._id);

  if (!head) {
    res.status(401);
    throw new Error("Head Household not found.");
  }

  // cleaners = task.cleaner_assigned.map(x => x.toString())
  if (task.head_household_id.toString() !== head.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

// @desc    Delete a scheduled task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found in the database.");
  }

  const head = await Head.findById(req.head._id);

  if (!head) {
    res.status(401);
    throw new Error("Head Household not found.");
  }

  // cleaners = task.cleaner_assigned.map(x => x.toString())
  if (task.head_household_id.toString() !== head.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  await task.remove();
  res.status(200).json({ id: req.params.id });
});

const deleteTasks = asyncHandler(async (req, res) => {
  if (!req.body.task_ids) {
    res.status(400);
    throw new Error("Missing 'task_ids' field in the body payload.");
  }

  let taskObjectIds;

  if (
    typeof req.body.task_ids === "array" ||
    req.body.task_ids instanceof Array
  ) {
    taskObjectIds = req.body.task_ids.map((id) => mongoose.Types.ObjectId(id));
  } else {
    taskObjectIds = [mongoose.Types.ObjectId(req.body.task_ids)];
  }

  const tasks = await Task.find(
    {
      _id: { $in: taskObjectIds },
    },
    { _id: true }
  );

  if (taskObjectIds.length != tasks.length) {
    throw new Error(
      "Some requested scheduled tasks to be deleted doesn't exist in the database."
    );
  }

  const deletedTasksStatus = await Task.deleteMany({
    _id: { $in: taskObjectIds },
  });

  res
    .status(200)
    .json({ taskObjectIds, deletedCount: deletedTasksStatus.deletedCount });
});

module.exports = {
  setTask,
  getTasks,
  getStats,
  updateTask,
  deleteTask,
  deleteTasks,
};
