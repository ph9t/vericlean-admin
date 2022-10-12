const asyncHandler = require("express-async-handler");
const CleanerLog = require("../models/cleanerLogModel.js");
const Video = require("../models/videoModel.js");

const uploadVideo = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Route requires task 'id' parameter.");
  }

  if (!req.body.video_path) {
    res.status(400);
    throw new Error("Missing required field: 'video_path'.");
  }

  const cleanerLog = await CleanerLog.find({
    scheduled_task_id: req.params.id,
    cleaner_id: req.cleaner._id,
  });

  if (!cleanerLog) {
    res.status(400);
    throw new Error(
      `Cannot find CleanerLog with task 'id' of ${req.params.id} and 'cleaner_id' of ${req.cleaner._id}`
    );
  } 

  const video = await Video.findById(cleanerLog[0].video_id);
  // refactor this part,, ok??
  const video_path = video.video_path;
  video_path.push(req.body.video_path);
  res
    .status(200)
    .json(
      await Video.findByIdAndUpdate(
        cleanerLog[0].video_id,
        { video_path: video_path },
        { new: true }
      )
    );
});

module.exports = {
  uploadVideo,
};
