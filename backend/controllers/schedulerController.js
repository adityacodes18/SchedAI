const pool = require("../config/db");

const generateSchedule = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasksResult = await pool.query(
      `SELECT *
       FROM tasks
       WHERE user_id = $1
       AND status = 'pending'
       ORDER BY created_at ASC`,
      [userId]
    );

    const taskList = tasksResult.rows;

    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3
    };

    taskList.sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    let currentTime = new Date();

    currentTime.setHours(9, 0, 0, 0);

    const scheduledTasks = [];

    for (const task of taskList) {
      const startTime = new Date(currentTime);

      const endTime = new Date(
        currentTime.getTime() +
        task.estimated_duration * 60000
      );

      await pool.query(
        `UPDATE tasks
         SET scheduled_start = $1,
             scheduled_end = $2
         WHERE id = $3`,
        [startTime, endTime, task.id]
      );

      scheduledTasks.push({
        id: task.id,
        title: task.title,
        priority: task.priority,
        scheduled_start: startTime,
        scheduled_end: endTime
      });

      currentTime = endTime;
    }

    res.json({
      message: "Schedule generated successfully",
      totalTasks: scheduledTasks.length,
      schedule: scheduledTasks
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  generateSchedule
};