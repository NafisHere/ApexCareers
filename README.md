# 💼 JobSphere

A full-stack MERN-based job portal that connects applicants, recruiters and administrators through a role-based system. JobSphere enables applicants to search and apply for jobs, recruiters to manage job postings and applicants and admins to oversee platform activities with approval workflows.

---

## 🚀 Live Demo

- 🌐 Frontend: https://job-spherefrontend.vercel.app/
- 🔗 Backend API: https://jobportal-api-opal.vercel.app/

---

<!-- ## 📸 Screenshots

> Store your images inside `/screenshots/` folder in your repo.

![Home](./screenshots/home.png)
![Applicant Dashboard](./screenshots/applicant-dashboard.png)
![Recruiter Dashboard](./screenshots/recruiter-dashboard.png)
![Admin Panel](./screenshots/admin-panel.png)

--- -->

## 🛠️ Tech Stack

### Frontend

- React.js
- Redux (State Management)
- Tailwind CSS + shadcn Ui

### Backend

- Node.js
- Express.js

### Database

- MongoDB (with indexing & middleware)

### Other Tools & Services

- JWT Authentication
- Cloudinary (File Upload - Resume/CV)

---

## ✨ Features

### 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (Applicant / Recruiter / Admin)
- Protected routes for secure operations

---

### 👤 Applicant Features

- Browse and search jobs (by title, location, type)
- Apply to jobs with resume upload
- Bookmark jobs to apply later
- Track application status (Pending / Approved / Rejected)
- Update profile (skills, resume, etc.)

---

### 🏢 Recruiter Features

- Company registration with admin approval workflow
- Post jobs under approved company
- View applicants for each job
- Access applicant resumes
- Update application status (approve/reject)

---

### 🛡️ Admin Features

- Approve or reject company registrations
- Manage users, jobs, and platform data
- Receive notifications for new company requests

---

### 🔔 System Features

- Notification system (on-demand fetching)
- Role-based dashboards
- Resume and profile picture upload using Cloudinary
- Optimized bookmark system using MongoDB indexing

---

## ⚙️ Installation & Setup

```bash

# Clone the repository

git clone https://github.com/md-redwanislam/jobsphere

# Install frontend dependencies

cd client
npm install

# Install backend dependencies

cd ../server
npm install

# Run the project

npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the server folder and add:

```env
PORT= you_port_number
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
API_KEY=your_api_key
API_SECRET=your_api_secret
FRONTEND_URL= your_frontend_url
```

---

## 📁 Folder Structure

```
client/
├── src/
├── components/
├── pages/
├── redux/

server/
├── controllers/
├── models/
├── routes/
├── middleware/
```

---

## 🧠 Challenges & Learnings

One of the key features implemented in this project was job application tracking. When an applicant applies to a job, the status initially appears as "pending" on their dashboard. Later, when a recruiter updates the status (e.g., approved or rejected), the applicant can view the updated status from their profile. Initially, this system was not real-time, and updates were only visible after refreshing or navigating through the dashboard.

To improve user experience, a notification system was introduced for recruiters and admins. For example, admins receive notifications when a company requests verification. Although this system is not real-time and fetches data on demand, it helped in understanding how asynchronous communication between frontend and backend works.

Through these implementations, I strengthened my understanding of:

- Frontend-backend communication for user-specific data
- State management and UI updates based on backend changes
- Role-based workflows and data handling
- Designing scalable features with future improvements like real-time updates

This project also improved my ability to break down complex features into manageable steps and implement them effectively.

---

## 🔮 Future Improvements

- 🔄 Real-time notifications (WebSockets)
- 📊 Advanced analytics dashboard
- 📩 Email notifications
- 🔍 Improved search with more filters
- 🧪 Unit & integration testing

---

## 🔑 Credentials

- Open registration for Applicants & Recruiters
- Admin access:
  - Email: admin@mail.com
  - Password: admin1234

---

## 👤 Author

**Md. Redwan Islam**

- 💼 Full-Stack MERN Developer
- 🌐 Portfolio: https://md-redwanislam.github.io/portfolio/
- 🔗 LinkedIn: https://linkedin.com/in/md-redwan-islam/
- 📧 Email: [riadislam9117@gmail.com](mailto:riadislam9117@gmail.com?subject=Regarding%20JobSphere%20Project)

---

## 📜 License

This project is licensed under the MIT License.
