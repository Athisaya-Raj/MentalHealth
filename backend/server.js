const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes    = require("./routes/authRoutes");
const surveyRoutes  = require("./routes/surveyRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const messageRoutes = require("./routes/messageRoutes");
const adminRoutes   = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth",     authRoutes);
app.use("/api/surveys",  surveyRoutes);
app.use("/api/teacher",  teacherRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin",    adminRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
