const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedbackModel.js");

const getFeedback = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Route requires 'id' for the task.");
  }

  const feedback = await Feedback.findOne({ scheduled_task_id: req.params.id }); // findOne??

  if (!feedback) {
    res.status(400);
    throw new Error(`Feedback with scheduled_taks_id ${req.params.id} not found.`);
  }

  res.status(200).json(feedback);
});

const updateFeedback = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Route requires 'id' for the task.");
  }

  if (!req.body.feedback_body) {
    res.status(400);
    throw new Error("Missing required field: feedback_body.");
  }

  const feedback = await Feedback.findOneAndUpdate(
    { scheduled_task_id: req.params.id },
    { feedback_body: req.body.feedback_body },
    { new: true }
  );

  res.status(200).json(feedback);
});

module.exports = {
  getFeedback,
  updateFeedback,
};
