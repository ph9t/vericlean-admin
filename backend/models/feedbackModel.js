const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    scheduled_task_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Task",
    },
    head_household_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Head",
    },
    feedback_body: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
