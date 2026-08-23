# 🎬 SidFlix

> A modern full-stack movie ticket booking platform built with React, Node.js, Express, MongoDB, Clerk, and the TMDB API.

![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)

## 🌐 Live Demo

🚀 **Frontend:** https://sid-flix-unthinkable-solutions.vercel.app

> The frontend is currently deployed on Vercel.

---

## 📌 About The Project

**SidFlix** is a modern full-stack movie ticket booking platform designed to provide a seamless cinema booking experience.

The application allows users to explore movies and available shows, select preferred show timings, choose seats through an interactive seat layout, manage favourite movies, and access their accounts securely.

The platform also includes protected admin functionality for managing movie shows and verifying admin access.

SidFlix follows a full-stack architecture with a separate React frontend and Node.js/Express backend.

---

## ✨ Features

### 👤 User Features

- 🎬 Browse available movies and shows
- 🔍 Explore movie and show details
- ⏰ View available show timings
- 🪑 Interactive seat selection
- ❤️ Add and manage favourite movies
- 🎟️ Movie ticket booking workflow
- 🔐 Secure user authentication
- 📱 Responsive and modern user interface

### 🛠️ Admin Features

- 👨‍💼 Protected admin access
- 🔒 Admin authorization verification
- 🎥 Manage movie shows
- ➕ Create and manage available screenings

### 🎞️ Movie Data

- TMDB API integration
- Dynamic movie information
- Movie posters and images
- Centralized image base URL configuration

---

## 🏗️ Project Structure

```text
SidFlix/
│
├── client/                         # React + Vite Frontend
│   ├── src/
│   │   ├── assets/                 # Images and static assets
│   │   ├── components/             # Reusable UI components
│   │   ├── context/                # Global App Context
│   │   ├── pages/                  # Application pages
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/                         # Node.js + Express Backend
│   ├── configs/                    # Database configuration
│   ├── controllers/                # Application logic
│   ├── middleware/                 # Custom middleware
│   ├── models/                     # MongoDB models
│   ├── routes/                     # API routes
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
