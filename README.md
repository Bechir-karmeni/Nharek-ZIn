# 📓 Nharek Zin – Your Daily Planner App

**Nhare Zin** is a full-featured productivity and planning app that helps users manage their daily life with ease. It combines a **to-do list**, **water tracker**, **mood tracker**, **notes**, **budget tracking**, **goal setting**, and a **calendar view** (daily/weekly/monthly). Built with ❤️ using Node.js and vanilla frontend tech, it's a one-stop personal dashboard for productivity.

---

## 📌 Features

- ✅ User Authentication (Signup & Login)
- 🗓️ Daily, Weekly & Monthly Task Management
- 💧 Water Intake Tracker
- 😃 Mood Logger
- 📝 Personal Notes
- 💰 Expense and Income Tracking
- 🎯 Goal Management (Monthly)
- 📊 Dashboard with Charts (Budget Visualization)
- 📬 Contact & About Page (Enhanced Landing)

---

## 🚀 Tech Stack

| Technology         | Purpose                        |
|--------------------|--------------------------------|
| Node.js            | Backend runtime                |
| Express.js         | REST API framework             |
| PostgreSQL         | Relational database            |
| HTML5 & CSS3       | Frontend UI                    |
| JavaScript (ES6+)  | Logic & Interactions           |
| Chart.js           | Visualizations (Pie, Doughnut) |
| bcrypt.js          | Secure password hashing        |
| JSON Web Token     | Auth token management          |
| express-session    | Session persistence            |

---

## 🏁 How to Run Locally

### 1. Clone the project

```bash
git clone https://github.com/yourusername/nhare-zin.git
cd nhare-zin

## Installation
cd backend
npm install   

3. Set up PostgreSQL Database
CREATE DATABASE nharezin;

4. Create .env file in /backend
PORT=5000
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
DATABASE_URL=postgres://your_pg_user:your_pg_password@localhost:5432/nharezin

5. Start the server
npm start

6. Run the frontend
From the root or /frontend, use a local server like:
cd frontend
npx live-server


(Or open index.html using Live Server in VSCode.)# 📓 Nharek Zin – Your Daily Planner App

**Nhare Zin** is a full-featured productivity and planning app that helps users manage their daily life with ease. It combines a **to-do list**, **water tracker**, **mood tracker**, **notes**, **budget tracking**, **goal setting**, and a **calendar view** (daily/weekly/monthly). Built with ❤️ using Node.js and vanilla frontend tech, it's a one-stop personal dashboard for productivity.

---

## 📌 Features

- ✅ User Authentication (Signup & Login)
- 🗓️ Daily, Weekly & Monthly Task Management
- 💧 Water Intake Tracker
- 😃 Mood Logger
- 📝 Personal Notes
- 💰 Expense and Income Tracking
- 🎯 Goal Management (Monthly)
- 📊 Dashboard with Charts (Budget Visualization)
- 📬 Contact & About Page (Enhanced Landing)

---

## 🚀 Tech Stack

| Technology         | Purpose                        |
|--------------------|--------------------------------|
| Node.js            | Backend runtime                |
| Express.js         | REST API framework             |
| PostgreSQL         | Relational database            |
| HTML5 & CSS3       | Frontend UI                    |
| JavaScript (ES6+)  | Logic & Interactions           |
| Chart.js           | Visualizations (Pie, Doughnut) |
| bcrypt.js          | Secure password hashing        |
| JSON Web Token     | Auth token management          |
| express-session    | Session persistence            |

---

## 🏁 How to Run Locally

### 1. Clone the project

```bash
git clone https://github.com/yourusername/nhare-zin.git
cd nhare-zin




📁 Folder Structure

nhare-zin/
│
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── tasks.js
│   │   ├── goals.js
│   │   ├── expenses.js
│   │   ├── moods.js
│   │   ├── water.js
│   │   └── ...
│   ├── db.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── css/
│   │   ├── dashboard.css
│   │   └── ...
│   ├── js/
│   │   ├── dashboard.js
│   │   └── ...
│   ├── index.html
│   ├── dashboard.html
│   ├── daily.html
│   ├── weekly.html
│   ├── monthly.html
│
├── README.md
└── package.json



🗃️ Database Tables
🧑 users

Field | Type | Description
id | SERIAL | Primary key
name | TEXT | Full name
email | TEXT | Unique user email
password | TEXT | Hashed password



✅ tasks

Field | Type | Description
id | SERIAL | Primary key
user_id | INTEGER | Reference to users table
title | TEXT | Task title
completed | BOOLEAN | Task status
task_date | DATE | Scheduled date
created_at | TIMESTAMP | Time created


📝 notes
Field | Type | Description
id | SERIAL | Primary key
user_id | INTEGER | Reference to users table
title | TEXT | Note title
content | TEXT | Note body
created_at | TIMESTAMP | Time created



💧 water

Field | Type | Description
id | SERIAL | Primary key
user_id | INTEGER | Reference to users table
total | INTEGER | Number of glasses drank
date | DATE | Water intake date


😄 moods
Field | Type | Description
id | SERIAL | Primary key
user_id | INTEGER | Reference to users table
mood | TEXT | Mood (Happy, Sad, etc.)
date | DATE | Mood entry date


💰 expenses

Field | Type | Description
id | SERIAL | Primary key
user_id | INTEGER | Reference to users table
type | TEXT | 'income' or 'expense'
amount | INTEGER | Amount in DA
description | TEXT | Optional description
category | TEXT | e.g. Food, Transport, Health...
created_at | TIMESTAMP | Date of creation


🎯 goals

Field | Type | Description
id | SERIAL | Primary key
user_id | INTEGER | Reference to users table
name | TEXT | Goal title
description | TEXT | Goal description
status | TEXT | 'Completed' or 'In Progress'

---

✅ **Done!** Now you can paste this into your `README.md` file on GitHub and it will be 100% clean, interactive, and informative.

Want a banner, GIF preview, or live demo badge at the top too? I can add that as well!
