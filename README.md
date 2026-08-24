# 🎬 SidFlix

> A modern full-stack movie ticket booking platform built with React, Node.js, Express, MongoDB, Clerk, Stripe, and TMDB.

SidFlix allows users to discover movies, explore show details, select show timings and seats, and book movie tickets through a modern and responsive interface.

---

## 🚀 Live Demo

### 🎥 Frontend

🔗 **Vercel:** https://sid-flix-unthinkable-solutions-4ksp-711lb53q2-sid007-v.vercel.app/

### ⚙️ Backend API

🔗 **Render:** https://sidflix-unthinkable-solutions.onrender.com

---

## ✨ Features

- 🎬 Browse movies and shows
- 🔍 View detailed movie information
- 🕒 Select available show timings
- 💺 Interactive seat selection
- 🚫 Prevent booking already occupied seats
- 🎟️ Select up to 5 seats per booking
- 🔐 Secure authentication using Clerk
- 👤 User account integration
- 👑 Admin functionality
- 💳 Stripe payment integration
- 🗄️ MongoDB database integration
- 🎥 Movie information powered by TMDB
- 📱 Fully responsive user interface
- ⚡ Fast frontend powered by Vite

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Clerk
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

### APIs & Services

- TMDB API
- Clerk Authentication
- Stripe Payments
- MongoDB Atlas
- Render
- Vercel

---

## 📂 Project Structure

```text
SidFlix/
│
├── assets/                     # Project images and screenshots
│
├── client/                     # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   └── pages/
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend Express application
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── inngest/
│   ├── server.js
│   └── package.json
│
└── README.md
