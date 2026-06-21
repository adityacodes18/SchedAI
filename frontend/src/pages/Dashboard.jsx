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

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDuration("");

      fetchTasks();

      alert("Task Created Successfully!");
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
        background: "#0f172a",
        color: "white",
        display: "flex",
        fontFamily: "Inter, Arial, sans-serif"
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#111827",
          padding: "30px",
          borderRight: "1px solid #1f2937"
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "40px"
          }}
        >
          🚀 SchedAI
        </h1>

        <div style={{ lineHeight: "3" }}>
          <div>📊 Dashboard</div>
          <div>📝 Tasks</div>
          <div>⚡ Schedule</div>
          <div>⚙️ Settings</div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "30px"
        }}
      >
        <h1
          style={{
            marginBottom: "25px"
          }}
        >
          Welcome Back 👋
        </h1>

        {/* Stats */}
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
              padding: "20px",
              borderRadius: "15px"
            }}
          >
            <h2>{totalTasks}</h2>
            <p>Total Tasks</p>
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "15px"
            }}
          >
            <h2>{highPriorityTasks}</h2>
            <p>High Priority</p>
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "15px"
            }}
          >
            <h2>{completedTasks}</h2>
            <p>Completed</p>
          </div>
        </div>

        {/* Create Task */}
        <div
          style={{
            background: "#1e293b",
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
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={inputStyle}
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
            style={inputStyle}
          />

          <button
            onClick={createTask}
            style={{
              ...buttonStyle,
              background: "#2563eb"
            }}
          >
            Create Task
          </button>

          <button
            onClick={generateSchedule}
            style={{
              ...buttonStyle,
              background: "#10b981",
              marginLeft: "10px"
            }}
          >
            Generate Schedule
          </button>
        </div>

        {/* Two Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px"
          }}
        >
          {/* Tasks */}
          <div>
            <h2>Your Tasks</h2>

            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  background: "#1e293b",
                  padding: "15px",
                  borderRadius: "12px",
                  marginBottom: "15px"
                }}
              >
                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <p>
                  Priority:
                  <span
                    style={{
                      marginLeft: "8px",
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
          </div>

          {/* Schedule */}
          <div>
            <h2>Generated Schedule</h2>

            {schedule.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#064e3b",
                  padding: "15px",
                  borderRadius: "12px",
                  marginBottom: "15px"
                }}
              >
                <h3>{item.title}</h3>

                <p>
                  Start:
                  {" "}
                  {new Date(
                    item.scheduled_start
                  ).toLocaleString()}
                </p>

                <p>
                  End:
                  {" "}
                  {new Date(
                    item.scheduled_end
                  ).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #374151",
  background: "#334155",
  color: "white",
  boxSizing: "border-box"
};

const buttonStyle = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Dashboard;