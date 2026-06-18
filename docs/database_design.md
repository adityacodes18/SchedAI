# SchedAI Database Design

## Database: PostgreSQL

---

# Users Table

Stores user account information.

| Column | Type | Description |
|----------|----------|----------|
| id | SERIAL PRIMARY KEY | Unique User ID |
| name | VARCHAR(100) | User Name |
| email | VARCHAR(255) UNIQUE | User Email |
| password | VARCHAR(255) | Hashed Password |
| created_at | TIMESTAMP | Account Creation Date |

---

# Tasks Table

Stores all user tasks.

| Column | Type | Description |
|----------|----------|----------|
| id | SERIAL PRIMARY KEY | Task ID |
| user_id | INTEGER | References Users Table |
| title | VARCHAR(255) | Task Title |
| description | TEXT | Task Description |
| priority | VARCHAR(20) | Low, Medium, High |
| deadline | TIMESTAMP | Task Deadline |
| estimated_duration | INTEGER | Estimated Minutes |
| actual_duration | INTEGER | Actual Minutes |
| status | VARCHAR(20) | Pending, In Progress, Completed |
| created_at | TIMESTAMP | Creation Date |

---

# Schedules Table

Stores AI-generated schedules.

| Column | Type | Description |
|----------|----------|----------|
| id | SERIAL PRIMARY KEY | Schedule ID |
| user_id | INTEGER | References Users Table |
| task_id | INTEGER | References Tasks Table |
| start_time | TIMESTAMP | Start Time |
| end_time | TIMESTAMP | End Time |
| date | DATE | Schedule Date |

---

# Analytics Table

Stores productivity metrics.

| Column | Type | Description |
|----------|----------|----------|
| id | SERIAL PRIMARY KEY | Analytics ID |
| user_id | INTEGER | References Users Table |
| focus_score | DECIMAL | Productivity Score |
| completion_rate | DECIMAL | Completion Percentage |
| tasks_completed | INTEGER | Completed Tasks |
| week_start_date | DATE | Analytics Week |

---

# Relationships

Users → Tasks

One User can have many Tasks.

Tasks → Schedules

One Task can have multiple Schedule entries.

Users → Analytics

One User can have multiple Analytics records.

---

# ER Diagram (Simple)

Users
|
|
v

Tasks
|
|
v

Schedules

Users
|
|
v

Analytics

---

# Example Data

User

Name: Aditya

Email: aditya@example.com

---

Task

Title: Complete DBMS Assignment

Priority: High

Deadline: 2026-06-25

Estimated Duration: 180 minutes

Status: Pending

---

Schedule

9:00 AM → 11:00 AM

Task: Complete DBMS Assignment

---

Analytics

Completion Rate: 82%

Focus Score: 76