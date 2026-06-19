# 🚀 InterviewAI

An AI-powered Career Assistant that helps users analyze resumes, match job descriptions, practice interviews, generate cover letters, and receive personalized learning roadmaps.

## 🌐 Live Demo

Frontend: https://interview-1inim6ojx-kavya-agarwals-projects.vercel.app

Backend API: https://interviewai-backend-6m8b.onrender.com

---

## ✨ Features

### 📄 Resume Analysis

* Upload PDF resumes
* AI-powered resume evaluation
* Resume score generation
* Skill extraction
* Project analysis
* Strengths and weaknesses identification

### 🎯 Job Match Analyzer

* Compare resume with job descriptions
* Match score generation
* Matching skills detection
* Missing skills identification
* Improvement suggestions

### 🎤 AI Mock Interview

* Technical interview questions
* Behavioral interview questions
* Project-based interview questions
* Answer evaluation
* Score generation
* Interview performance tracking

### ✉️ Cover Letter Generator

* Generate personalized cover letters
* AI-powered content generation
* Job-specific customization

### 🗺️ Learning Roadmap

* Personalized learning paths
* Weekly learning plans
* Skill gap analysis
* Career-focused recommendations

### 📊 Dashboard Analytics

* Resume statistics
* Interview statistics
* Performance tracking
* Progress visualization

### 📑 PDF Report Generation

* Download interview reports
* Download performance summaries

### 🔐 Authentication

* User Signup/Login
* JWT Authentication
* Protected Routes

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* Axios

### Backend

* FastAPI
* Python
* JWT Authentication

### Database

* MongoDB Atlas

### AI

* Google Gemini API

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📂 Project Structure

```bash
InterviewAI
│
├── frontend
│   ├── app
│   ├── components
│   ├── services
│   └── public
│
├── backend
│   ├── api
│   ├── services
│   ├── repositories
│   ├── database
│   └── utils
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/KA18202005/InterviewAI.git
cd InterviewAI
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```bash
http://localhost:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
MONGO_URI=your_mongodb_uri

GEMINI_API_KEY=your_gemini_api_key

JWT_SECRET=your_secret_key
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📸 Screenshots

Add screenshots here:

* Homepage
* Dashboard
* Resume Analysis
* Job Match
* Interview Simulator
* Cover Letter Generator

---

## 🎯 Future Improvements

* Voice-based interview simulation
* AI Resume Builder
* Job Recommendation Engine
* Email Interview Feedback
* Multi-language Support
* Dark/Light Theme Toggle

---

## 👨‍💻 Author

Kavya Agarwal

GitHub: https://github.com/KA18202005

---

⭐ If you like this project, give it a star!
