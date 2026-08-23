# 🎬 SidFlix

### Your Cinema Experience — Modern Movie Ticket Booking Platform

SidFlix is a full-stack movie ticket booking platform that allows users to discover movies, watch trailers, select show timings, choose seats, save favorite movies, and manage bookings through a modern and responsive interface.

Built using **React, Node.js, Express, MongoDB, Clerk Authentication, and TMDB API**.

🔴 **Live Demo:** https://sid-flix-unthinkable-solutions.vercel.app

---

## 🚀 Features

- 🎥 Browse currently available movies and shows
- 🔎 Search and discover movies
- ▶️ Watch movie trailers
- ❤️ Add and manage favorite movies
- 🔐 Secure authentication using Clerk
- 🎟️ Interactive cinema seat selection
- 🕒 Select available movie timings
- 💺 Book preferred cinema seats
- 👤 User-specific movie favorites and data
- 🛠️ Admin panel for managing shows
- 📱 Fully responsive modern UI
- 🎬 Movie data and images powered by TMDB API

---

# 🖼️ Screenshots

## 🏠 Homepage

![SidFlix Homepage](./assets/screenshots/Homepage.png)

---

## 🎥 Trailers

![SidFlix Trailers](./assets/screenshots/Trailers.png)

---

## 💺 Seat Selection

![SidFlix Seat Selection](./assets/screenshots/SeatSelection.png)

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- Clerk Authentication

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Clerk Express
- CORS
- dotenv

### APIs & Services

- TMDB API
- Clerk Authentication
- MongoDB

---

## 📂 Project Structure

```text
SidFlix---Unthinkable-Solutions/
│
├── client/                     # Frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend application
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── assets/
│   └── screenshots/
│       ├── Homepage.png
│       ├── Trailers.png
│       └── SeatSelection.png
│
└── README.md
