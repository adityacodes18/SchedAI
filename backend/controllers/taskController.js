const pool = require("../config/db");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      title,
      description,
      priority,
      estimated_duration
    } = req.body;

    const newTask = await pool.query(
      `INSERT INTO tasks
      (user_id, title, description, priority, estimated_duration)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        userId,
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

// GET TASKS
const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );

    res.json(tasks.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const {
      title,
      description,
      priority,
      status,
      estimated_duration
    } = req.body;

    const updatedTask = await pool.query(
      `UPDATE tasks
       SET title = $1,
           description = $2,
           priority = $3,
           status = $4,
           estimated_duration = $5
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [
        title,
        description,
        priority,
        status,
        estimated_duration,
        id,
        userId
      ]
    );

    if (updatedTask.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task updated successfully",
      task: updatedTask.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedTask = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (deletedTask.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully",
      task: deletedTask.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};