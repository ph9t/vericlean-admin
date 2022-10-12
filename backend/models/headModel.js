const mongoose = require("mongoose");

const headSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Mising field: first name."]
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
    role: {
      type: String,
      required: [true, "Missing field: role."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Head", headSchema);
