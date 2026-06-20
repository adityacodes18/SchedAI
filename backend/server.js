const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const schedulerRoutes = require("./routes/schedulerRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/scheduler", schedulerRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "SchedAI Backend Running 🚀"
  });
});
app.get("/test-tasks", (req, res) => {
  res.json({ message: "Tasks route loaded" });
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database connection failed"
    });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
