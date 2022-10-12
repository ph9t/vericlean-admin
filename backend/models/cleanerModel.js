const mongoose = require("mongoose");

const cleanerSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Missing field: first name."]
    },
    last_name: {
      type: String,
      required: [true, "Missing field: last name."]
    },
    email: {
      type: String,
      required: [true, "Missing field: email."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Missing field: password."],
    },
    phone: Number,
    contract_start: {
      type: Date,
      // required: [true, "Missing field: start contract date."],
    },
    contract_end: {
      type: Date,
      // required: [true, "Missing field: end contract date."],
    },
    role: {
      type: String,
      required: [true, "Missing field: role."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cleaner", cleanerSchema);
