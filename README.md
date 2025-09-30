 readme_content = """# 🧩 Role-Based Projects Module

A full-stack web application that demonstrates **Authentication**, **Email OTP Verification**, and **Role-Based Access Control (RBAC)**.
The system provides two user roles: **Admin** and **Normal User**, each with specific permissions for managing projects.

---

 Features

Authentication & Authorization
- Signup and Signin using Gmail and password.
- Email-based OTP verification using **Nodemailer (Gmail SMTP)**.
- JWT-based token authentication.
- Role-based access control using middleware.

 Projects Module
- **Admin:**
  - Create new projects.
  - Edit and delete existing projects.
  - View all projects.
- **Normal User:**
  - View projects only.

---

 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React + TypeScript + React Router + Material UI + Axios + Styled Components |
| **Backend** | Node.js + TypeScript + Express + TypeORM |
| **Database** | PostgreSQL |
| **Authentication** | JWT (JSON Web Token) |
| **Email Service** | Gmail SMTP (Nodemailer) |

---

 Folder Structure

### Frontend
frontend/
│
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── routes/
│ ├── styles/
│ ├── App.tsx
│ └── main.tsx
│
└── package.json

### Backend
backend/
│
├── src/
│ ├── entities/
│ │ ├── User.ts
│ │ └── Project.ts
│ ├── routes/
│ │ ├── auth.routes.ts
│ │ └── project.routes.ts
│ ├── middleware/
│ │ ├── auth.middleware.ts
│ │ └── role.middleware.ts
│ ├── controllers/
│ ├── config/
│ ├── server.ts
│ └── app.ts
│
└── package.json

## ⚙️ Installation & Setup Instructions

### 🗄️ Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/role-based-projects-backend.git
   cd role-based-projects-backend

2. Install dependencies:
    npm install

3. Create PostgreSQL database:
Open pgAdmin or use terminal:
CREATE DATABASE projectsdb;

4. Run the backend server:
npm run dev