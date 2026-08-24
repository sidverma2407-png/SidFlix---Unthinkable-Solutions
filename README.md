🎬 SidFlix

A modern full-stack movie ticket booking platform built with React, Node.js, Express, MongoDB, Clerk, Stripe, and TMDB.

SidFlix allows users to discover movies, explore show details, select show timings and seats, and book movie tickets through a modern and responsive interface.

🚀 Live Demo
🎥 Frontend

🔗 Vercel: https://sid-flix-unthinkable-solutions.vercel.app

⚙️ Backend API

🔗 Render: https://sidflix-unthinkable-solutions.onrender.com

✨ Features
🎬 Browse movies and shows
🔍 View detailed movie information
🕒 Select available show timings
💺 Interactive seat selection
🚫 Prevent booking already occupied seats
🎟️ Select up to 5 seats per booking
🔐 Secure authentication using Clerk
👤 User account integration
👑 Admin functionality
💳 Stripe payment integration
🗄️ MongoDB database integration
🎥 Movie information powered by TMDB
📱 Fully responsive user interface
⚡ Fast frontend powered by Vite
🛠️ Tech Stack
Frontend
React.js
Vite
Tailwind CSS
React Router DOM
Axios
Clerk
Lucide React
React Hot Toast
Backend
Node.js
Express.js
MongoDB
Mongoose
CORS
dotenv
APIs & Services
TMDB API
Clerk Authentication
Stripe Payments
MongoDB Atlas
Render
Vercel
📂 Project Structure
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
⚙️ Installation and Setup
1️⃣ Clone the Repository
git clone https://github.com/sidverma2407-png/SidFlix---Unthinkable-Solutions.git
cd SidFlix---Unthinkable-Solutions
💻 Frontend Setup

Navigate to the client directory:

cd client

Install dependencies:

npm install

Create a .env file:

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000
VITE_CURRENCY=₹
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500

Run the development server:

npm run dev
🖥️ Backend Setup

Navigate to the server directory:

cd server

Install dependencies:

npm install

Create a .env file:

PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

ADMIN_USER_ID=your_admin_user_id

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

TMDB_API_KEY=your_tmdb_api_key

STRIPE_SECRET_KEY=your_stripe_secret_key

Start the backend server:

npm start

The backend will run locally at:

http://localhost:3000
🌐 Production Environment

For the deployed frontend, use the Render backend URL:

VITE_BASE_URL=https://sidflix-unthinkable-solutions.onrender.com
Production URLs
Service	Platform	Live URL
🎬 Frontend	Vercel	https://sid-flix-unthinkable-solutions.vercel.app
⚙️ Backend API	Render	https://sidflix-unthinkable-solutions.onrender.com
🎟️ Seat Booking Flow
Select Movie
     ↓
Choose Show Date
     ↓
Select Available Time
     ↓
Choose Seats
     ↓
Check Occupied Seats
     ↓
Proceed to Checkout
     ↓
Stripe Payment
     ↓
Booking Confirmation

The application prevents users from selecting seats that have already been booked.

Users can select a maximum of 5 seats per booking.

🔐 Authentication

SidFlix uses Clerk for user authentication and management.

Users can:

Sign up
Sign in
Access authenticated features
Make bookings
Manage their account
💳 Payments

SidFlix integrates Stripe Checkout for secure online payments.

The booking flow:

User selects a show and seats.
The backend checks seat availability.
A booking is created.
Selected seats are temporarily marked as occupied.
Stripe Checkout session is created.
The user is redirected to the payment page.
🎬 Movie Data

Movie information is powered by the TMDB API.

The application can use movie data such as:

Movie titles
Posters
Backdrops
Release information
Descriptions
Movie details
🖼️ Screenshots

Project screenshots and assets are available in the assets folder.

🚀 Deployment
Frontend

The React/Vite frontend is deployed on Vercel.

Backend

The Node.js and Express backend is deployed on Render.

The backend connects with:

MongoDB Atlas
Clerk
Stripe
TMDB API
🔮 Future Improvements
📧 Booking confirmation emails
🔔 Notifications
📊 Enhanced admin dashboard
🎬 Movie trailers
⭐ Movie ratings and reviews
🎟️ Booking history improvements
💺 More advanced cinema seat layouts
📱 Further mobile UI improvements
🌙 Dark/light theme support
👨‍💻 Author

Siddharth Verma

B.Tech CSE Student | Full Stack Developer

⭐ Support

If you like this project, please consider giving the repository a ⭐ Star!

Made with ❤️ by Siddharth Verma.
