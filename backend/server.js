const path = require("path");
const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware.js");

const connectDB = require("./config/database.js");
const port = process.env.PORT;

connectDB();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tasks", require("./routes/taskRoutes.js"));
app.use("/api/cleaners", require("./routes/cleanerRoutes.js"));
app.use("/api/heads", require("./routes/headRoutes.js"));
app.use("/api/rtc", require("./routes/rtcRoutes.js"));
app.use("/api/qr", require("./routes/qrRoutes.js"));
app.use("/api/video", require("./routes/videoRoutes.js"));
app.use("/api/feedbacks", require("./routes/feedbackRoutes.js"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Set to production."));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
