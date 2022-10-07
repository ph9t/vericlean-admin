const asyncHandler = require("express-async-handler");
const QuickR = require("../models/qrModel.js");
const CleanerLog = require("../models/cleanerLogModel.js");

const scanQr = asyncHandler(async (req, res) => {
  if (!req.params.task_id) {
    res.status(400);
    throw new Error("Route requires 'task_id'.");
  }

  if (!req.body.scan_time_in && !req.body.scan_time_out) {
    res.status(400);
    throw new Error(
      "Missing required fields: 'scan_time_in' or 'scan_time_out'."
    );
  }

  const cleanerLog = await CleanerLog.find({
    scheduled_task_id: req.params.task_id,
    cleaner_id: req.cleaner.id,
  });

  if (!cleanerLog) {
    res.status(400);
    throw new Error(
      `Cannot find CleanerLog with 'task_id' of ${req.params.task_id} and 'cleaner_id' of ${req.cleaner._id}`
    );
  }

  const quickR = await QuickR.findByIdAndUpdate(
    cleanerLog[0].qr_log_id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(quickR);
});

const getQr = asyncHandler(async (req, res) => {
  if (!req.params.task_id) {
    res.status(400);
    throw new Error("Route requires 'task_id'.");
  }

  const cleanerLog = await CleanerLog.find({
    scheduled_task_id: req.params.task_id,
    cleaner_id: req.cleaner.id,
  });

  if (!cleanerLog) {
    res.status(400);
    throw new Error(
      `Cannot find CleanerLog with 'task_id' of ${req.params.task_id} and 'cleaner_id' of ${req.cleaner._id}`
    );
  }

  const quickR = await QuickR.findById(cleanerLog[0].qr_log_id);
  res.status(200).json(quickR);
});

module.exports = {
  scanQr,
  getQr,
};
