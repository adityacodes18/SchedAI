import { useState, useEffect } from "react";
import api from "../services/api";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [duration, setDuration] = useState("");

  const [tasks, setTasks] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const totalTasks = tasks.length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/tasks",
        {
          title,
          description,
          priority,
          estimated_duration: Number(duration)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Task Created Successfully!");

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDuration("");

      fetchTasks();

    } catch (error) {
      console.error(error);
      alert("Error creating task");
    }
  };

  const generateSchedule = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/scheduler/generate",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSchedule(response.data.schedule);

      alert("Schedule Generated!");

    } catch (error) {
      console.error(error);
      alert("Error generating schedule");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "30px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "3rem",
            marginBottom: "30px"
          }}
        >
          🚀 SchedAI
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "30px"
          }}
        >
          <div
            style={{
              background: "#1e293b",
              color: "white",
              padding: "20px",
              borderRadius: "12px"
            }}
          >
            <h2>{totalTasks}</h2>
            <p>Total Tasks</p>
          </div>

          <div
            style={{
              background: "#1e293b",
              color: "white",
              padding: "20px",
              borderRadius: "12px"
            }}
          >
            <h2>{highPriorityTasks}</h2>
            <p>High Priority</p>
          </div>

          <div
            style={{
              background: "#1e293b",
              color: "white",
              padding: "20px",
              borderRadius: "12px"
            }}
          >
            <h2>{completedTasks}</h2>
            <p>Completed</p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#1e293b",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px"
          }}
        >
          <h2>Create Task</h2>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              backgroundColor: "#334155",
              color: "white",
              border: "1px solid #475569"
            }}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              backgroundColor: "#334155",
              color: "white",
              border: "1px solid #475569"
            }}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              backgroundColor: "#334155",
              color: "white",
              border: "1px solid #475569"
            }}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              backgroundColor: "#334155",
              color: "white",
              border: "1px solid #475569"
            }}
          />

          <button
            onClick={createTask}
            style={{
              padding: "12px 20px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "10px"
            }}
          >
            Create Task
          </button>

          <button
            onClick={generateSchedule}
            style={{
              padding: "12px 20px",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Generate Schedule
          </button>
        </div>

        <h2 style={{ color: "white" }}>Your Tasks</h2>

        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              backgroundColor: "#1e293b",
              color: "white",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "12px"
            }}
          >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              Priority:
              <span
                style={{
                  marginLeft: "5px",
                  fontWeight: "bold",
                  color:
                    task.priority === "High"
                      ? "#ef4444"
                      : task.priority === "Medium"
                      ? "#f59e0b"
                      : "#22c55e"
                }}
              >
                {task.priority}
              </span>
            </p>

            <p>
              Duration: {task.estimated_duration} mins
            </p>
          </div>
        ))}

        <h2 style={{ color: "white", marginTop: "30px" }}>
          Generated Schedule
        </h2>

        {schedule.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#064e3b",
              color: "white",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "12px"
            }}
          >
            <h3>{item.title}</h3>

            <p>
              Start:{" "}
              {new Date(item.scheduled_start).toLocaleString()}
            </p>

            <p>
              End:{" "}
              {new Date(item.scheduled_end).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;