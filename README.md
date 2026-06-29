# 🚀 SchedAI

## Intern Details

* **Name:** Aditya Thakran
* **Intern ID:** **CITS4573**

---

# 📌 Project Overview

SchedAI is a full-stack task management and scheduling web application developed using the MERN-style architecture (React, Node.js, Express.js, PostgreSQL). It enables users to securely manage their daily tasks by creating, updating, deleting, completing, and automatically scheduling them based on priority and estimated duration.

The project demonstrates authentication, REST APIs, database integration, CRUD operations, and scheduling logic in a modern web application.

---

# ✨ Features

* 🔐 Secure User Authentication using JWT
* 👤 User Registration & Login
* ➕ Create New Tasks
* 📋 View All Tasks
* ✏️ Update Task Status
* ✅ Mark Tasks as Completed
* 🗑️ Delete Tasks
* 📅 Generate Smart Daily Schedule
* 📊 Dashboard with Task Statistics
* 💾 PostgreSQL Database Integration
* 🎨 Modern React Dashboard UI

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Axios
* HTML5
* CSS3
* JavaScript (ES6)

## Backend

* Node.js
* Express.js
* JWT Authentication
* REST APIs

## Database

* PostgreSQL

## Tools Used

* Git
* GitHub
* Postman
* VS Code

---

# 📂 Project Structure

```text
SchedAI
│
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── schedulerController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── schedulerRoutes.js
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/adityacodes18/SchedAI.git
```

```bash
cd SchedAI
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file inside the **backend** folder.

```env
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_secret_key
PORT=8000
```

---

## 5. Start Backend Server

```bash
cd backend
npm run dev
```

---

## 6. Start Frontend

```bash
cd frontend
npm run dev
```

---

# 🌐 Application URLs

Frontend

```text
http://localhost:5173
```

Backend

```text
http://localhost:8000
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

---

## Tasks

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | `/api/tasks`     |
| POST   | `/api/tasks`     |
| PUT    | `/api/tasks/:id` |
| DELETE | `/api/tasks/:id` |

---

## Scheduler

| Method | Endpoint                  |
| ------ | ------------------------- |
| POST   | `/api/scheduler/generate` |

---

# 📷 Project Features

* User Registration & Login
* JWT-based Authentication
* Task Creation
* Task Management Dashboard
* Task Completion
* Task Deletion
* Automatic Schedule Generation
* PostgreSQL Database Integration

---

# 🚀 Future Enhancements

* AI-based Task Prioritization
* Calendar Integration
* Email Notifications
* Responsive Mobile Interface
* Cloud Deployment
* Productivity Analytics

---

# 👨‍💻 Author

**Aditya Thakran**

**Intern ID:** **CITS4573**

B.Tech Computer Science Engineering

---

# 📄 License

This project has been developed as part of an internship/college project for educational purposes only.
