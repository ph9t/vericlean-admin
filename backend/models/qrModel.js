const mongoose = require("mongoose");

const qrSchema = mongoose.Schema(
  {
    cleaner_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cleaner",
    },
    scan_time_in: {
      type: Date,
    },
    scan_time_out: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuickR", qrSchema);
