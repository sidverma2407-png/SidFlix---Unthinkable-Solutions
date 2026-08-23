# 🎬 SidFlix

<div align="center">

### Your Cinema Experience

A modern full-stack movie ticket booking platform built with **React, Node.js, Express, MongoDB, Clerk, and TMDB API**.

### 🌐 Live Demo

**[🚀 Visit SidFlix Live](https://sid-flix-unthinkable-solutions.vercel.app)**

</div>

---

## 🖼️ Project Preview

### 🏠 Homepage

![SidFlix Homepage](./assets/screenshots/Homepage.png)

### 🎥 Trailers

![SidFlix Trailers](./assets/screenshots/Trailers.png)

### 💺 Interactive Seat Selection

![SidFlix Seat Selection](./assets/screenshots/SeatSelection.png)

---

## ✨ About SidFlix

**SidFlix** is a modern movie ticket booking platform designed to provide a smooth and interactive cinema booking experience. Users can discover movies, watch trailers, select show timings, choose their preferred seats, save favorite movies, and access personalized features through secure authentication.

The platform combines a modern cinematic user interface with a full-stack architecture to deliver a realistic movie booking experience.

---

## 🚀 Features

- 🎬 Browse available movies and shows
- 🔍 Search and discover movies
- ▶️ Watch movie trailers
- ❤️ Add and manage favorite movies
- 🔐 Secure authentication using Clerk
- 🎟️ Interactive cinema seat selection
- 🕒 Select available movie timings
- 💺 Choose preferred cinema seats
- 🛒 Proceed through the booking flow
- 👤 Personalized user experience
- 🛠️ Admin authorization and protected routes
- 🎥 Movie data powered by TMDB API
- 📱 Responsive and modern UI

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
├── client/                     # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Node.js + Express Backend
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
```

---

## 🎬 Key Experiences

### 🏠 Discover Movies

Users can explore movies through a modern cinematic homepage designed for easy navigation and movie discovery.

### 🎥 Watch Trailers

SidFlix provides a dedicated trailer experience where users can preview movies before booking their cinema seats.

### 💺 Select Your Seats

The interactive seat selection interface allows users to choose:

1. A movie show
2. An available timing
3. Their preferred seats
4. Continue to the checkout flow

The cinema-style layout provides a realistic booking experience with clearly organized seat sections and screen positioning.

---

## 🔐 Authentication

SidFlix uses **Clerk** for secure user authentication.

Users can:

- Sign up securely
- Sign in to their account
- Access personalized features
- Save favorite movies
- Access protected routes
- Receive authorization-based access

Protected backend routes use authentication tokens:

```http
Authorization: Bearer <token>
```

---

## 🎞️ TMDB Integration

SidFlix integrates with the **TMDB API** for movie-related content and images.

The platform uses movie data for experiences such as:

- Movie information
- Movie posters and backdrops
- Currently available movies
- Movie details
- Trailer-related content

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sidverma2407-png/SidFlix---Unthinkable-Solutions.git
```

Move into the project:

```bash
cd SidFlix---Unthinkable-Solutions
```

---

# 💻 Frontend Setup

Navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_BASE_URL=http://localhost:3000
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the frontend:

```bash
npm run dev
```

The frontend will run locally at:

```text
http://localhost:5173
```

---

# 🖥️ Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file with your required configuration:

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

TMDB_API_KEY=your_tmdb_api_key
TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

Start the backend:

```bash
npm start
```

The backend will run locally at:

```text
http://localhost:3000
```

---

## 🌐 Environment Variables

### Client

| Variable | Description |
|---|---|
| `VITE_BASE_URL` | Backend API URL |
| `VITE_TMDB_IMAGE_BASE_URL` | TMDB image base URL |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |

### Server

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGODB_URI` | MongoDB connection string |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `TMDB_API_KEY` | TMDB API key |
| `TMDB_ACCESS_TOKEN` | TMDB API access token |

> ⚠️ Never commit your `.env` file or secret API keys to GitHub.

---

## 🔗 API Routes

### Shows

```http
GET /api/show/all
```

Fetches all available movie shows.

### Admin

```http
GET /api/admin/is-admin
```

Checks whether the authenticated user has admin access.

### User Favorites

```http
GET /api/user/favorites
```

Fetches the authenticated user's favorite movies.

---

## 🚀 Deployment

### Frontend

The SidFlix frontend is deployed on Vercel.

### 🌐 Live Application

**[https://sid-flix-unthinkable-solutions.vercel.app](https://sid-flix-unthinkable-solutions.vercel.app)**

For production, configure the frontend environment variable:

```env
VITE_BASE_URL=your_deployed_backend_url
```

The backend CORS configuration should also allow your deployed frontend domain.

Example:

```js
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://sid-flix-unthinkable-solutions.vercel.app",
    ],
    credentials: true,
  })
);
```

---

## 🔮 Future Improvements

- 💳 Payment gateway integration
- 🎫 Complete booking history
- 📧 Booking confirmation emails
- 🔔 Movie and booking notifications
- ⭐ Movie ratings and reviews
- 🏢 Multiple theater support
- 🎟️ QR-based digital tickets
- 📊 Advanced admin dashboard
- ☁️ Full production backend deployment

---

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Create a Pull Request

---

## 👨‍💻 Author

**Krish Desai**

Built with ❤️ using:

**React.js • Node.js • Express.js • MongoDB • Clerk • TMDB API**

---

<div align="center">

# 🎬 SidFlix

### Your Cinema Experience

⭐ If you like this project, consider giving the repository a star!

</div>
