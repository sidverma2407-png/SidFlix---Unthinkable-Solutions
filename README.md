# 🎬 SidFlix

> A modern full-stack movie ticket booking platform built with React, Node.js, Express, MongoDB, Clerk, and the TMDB API.

![SidFlix Banner](https://img.shields.io/badge/SidFlix-Movie%20Booking-ff2d55?style=for-the-badge)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

## 🌐 Live Demo

🚀 **Frontend:** [SidFlix Live](https://sid-flix-unthinkable-solutions.vercel.app)

---

## 📌 About The Project

**SidFlix** is a modern movie ticket booking platform designed to provide users with a seamless cinema booking experience.

Users can browse movies, explore available shows, select their preferred seats, manage favourite movies, and securely access their accounts. The platform also includes an **admin panel** for managing movie shows.

The project follows a full-stack architecture with a separate **React frontend** and **Node.js/Express backend**.

---

## ✨ Features

### 👤 User Features

- 🎬 Browse available movies and shows
- 🔍 Explore movie details
- ❤️ Add and manage favourite movies
- 🪑 Interactive seat selection
- ⏰ View available show timings
- 🎟️ Movie ticket booking workflow
- 🔐 Secure authentication with Clerk
- 📱 Responsive modern UI

### 🛠️ Admin Features

- 👨‍💼 Admin authorization and protected routes
- 🎥 Manage movie shows
- ➕ Create and manage available screenings
- 🔒 Secure admin access verification

### 🌐 API Integration

- 🎞️ Movie data powered by TMDB API
- 🖼️ Dynamic movie posters and images
- 🔄 Backend API integration with Axios

---

## 🖼️ Application Preview

### 🎬 Movie Booking Experience

Users can select their preferred show timing and choose seats through an interactive seat selection interface.

### 🪑 Seat Selection

- Available seats
- Selected seats
- Multiple seating sections
- Interactive booking experience
- Proceed to checkout functionality

---

## 🏗️ Project Structure

```text
SidFlix/
│
├── client/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── assets/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Node.js + Express Backend
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
