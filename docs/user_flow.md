# SchedAI User Flow

## Overview

SchedAI is an AI-powered productivity scheduler that helps users plan, prioritize, and complete tasks efficiently.

---

## User Journey

### 1. User Registration

- User creates an account using email and password.
- Account information is securely stored.

### 2. User Login

- User logs into the platform.
- Authentication is verified using JWT.

### 3. Dashboard Access

After login, the user is redirected to the dashboard.

Dashboard displays:

- Pending tasks
- Upcoming deadlines
- Today's schedule
- Productivity statistics

### 4. Task Creation

User creates a new task by entering:

- Task title
- Description
- Deadline
- Priority level
- Estimated difficulty

Example:

Task: Complete DBMS Assignment
Deadline: 25 June
Priority: High

### 5. AI Analysis

The AI engine analyzes:

- Task priority
- Deadline urgency
- User workload
- Historical completion data

The AI estimates:

- Expected duration
- Best completion window

### 6. Schedule Generation

Scheduler agent generates an optimized schedule.

Example:

9:00 AM - 11:00 AM → DBMS Assignment

2:00 PM - 3:00 PM → LeetCode Practice

6:00 PM - 7:00 PM → Project Work

### 7. Schedule Review

User reviews generated schedule.

User can:

- Accept schedule
- Modify schedule
- Regenerate schedule

### 8. Task Completion

User marks tasks as completed.

Completed tasks are stored for analytics.

### 9. Auto Rescheduling

If a task is missed:

- AI detects incomplete task
- AI recalculates workload
- AI creates updated schedule

### 10. Analytics Dashboard

System displays:

- Completion rate
- Focus score
- Productivity trends
- Weekly insights

### 11. Continuous Improvement

AI uses historical task data to improve future scheduling recommendations.