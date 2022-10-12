const asyncHandler = require("express-async-handler");
const QuickR = require("../models/qrModel.js");
const CleanerLog = require("../models/cleanerLogModel.js");

const scanQr = asyncHandler(async (req, res) => {
  if (!req.body.scan_time_in && !req.body.scan_time_out) {
    res.status(400);
    throw new Error(
      "Missing required fields: 'scan_time_in' or 'scan_time_out'."
    );
  }

  const cleanerLog = await CleanerLog.findOne({
    scheduled_task_id: req.params.id,
    cleaner_id: req.cleaner.id,
  });

  if (!cleanerLog) {
    res.status(400);
    throw new Error(
      `Cannot find CleanerLog with task 'id' of ${req.params.id} and 'cleaner_id' of ${req.cleaner._id}`
    );
  }

  const quickR = await QuickR.findByIdAndUpdate(
    cleanerLog.qr_log_id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(quickR);
});

const getQr = asyncHandler(async (req, res) => {

  const cleanerLog = await CleanerLog.findOne({
    scheduled_task_id: req.params.id,
    cleaner_id: req.cleaner.id,
  });

  if (!cleanerLog) {
    res.status(400);
    throw new Error(
      `Cannot find CleanerLog with task 'id' of ${req.params.id} and 'cleaner_id' of ${req.cleaner._id}`
    );
  }

  const quickR = await QuickR.findById(cleanerLog.qr_log_id);
  res.status(200).json(quickR);
});

module.exports = {
  scanQr,
  getQr,
};
