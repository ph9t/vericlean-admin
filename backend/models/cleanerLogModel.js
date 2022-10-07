const mongoose = require("mongoose");

const cleanerLogSchema = mongoose.Schema(
  {
    cleaner_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cleaner",
    },
    scheduled_task_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Task",
    },
    video_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Video",
    },
    qr_log_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "QuickR",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CleanerLog", cleanerLogSchema);
