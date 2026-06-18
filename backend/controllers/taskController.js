const pool = require("../config/db");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      estimated_duration
    } = req.body;

    const newTask = await pool.query(
      `INSERT INTO tasks
      (title, description, priority, estimated_duration)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        title,
        description,
        priority,
        estimated_duration
      ]
    );

    res.status(201).json({
      message: "Task created successfully",
      task: newTask.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};
const getTasks = async (req, res) => {
  try {
    const tasks = await pool.query(
      "SELECT * FROM tasks ORDER BY id DESC"
    );

    res.json(tasks.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};
module.exports = {
  createTask , 
  getTasks
};