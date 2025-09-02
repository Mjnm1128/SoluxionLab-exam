Basic To-Do Application with Login

This project is a Basic To-Do Application with user authentication and task management, built using ReactJS (TypeScript), NestJS (TypeScript), PostgreSQL, and Material-UI (MUI).


Features

1. User Login
   Sessions last 1 day.
   If the user closes the browser and returns without logging out, they are redirected to the To-Do List (Homepage).
   If the user logs out, they are redirected to the Login page.

2. To-Do List Management
  Create To-Do Item: Add new tasks.
  Edit To-Do Item: Modify existing tasks.
  Delete To-Do Item: Remove tasks.
  View To-Do List: Display all tasks on the homepage.

Project Setup

Backend (NestJS + PostgreSQL)
1. Navigate to the `backend` folder:
   ```bash
   cd backend
Install dependencies:

bash
Copy code
npm install
Set up environment variables in a .env file (example):

Start the backend server:

bash
Copy code
npm run start:dev
The backend server will run on http://localhost:3000 by default.

Frontend (ReactJS + Material-UI)
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start the frontend development server:

bash
Copy code
npm start
The frontend will run on http://localhost:3001 (or default React port).

Project Structure
bash
Copy code
root/
├─ backend/       # NestJS backend
├─ frontend/      # ReactJS frontend
├─ README.md      # Project documentation
