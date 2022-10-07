const mongoose = require("mongoose");

const headSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Missing name."],
    },
    email: {
      type: String,
      required: [true, "Missing email."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Missing password."],
    },
    role: {
      type: String,
      required: [true, "Missing role."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Head", headSchema);
