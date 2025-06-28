// backend/server.js
const express   = require("express");
const cors      = require("cors");
const path      = require("path");
const connectDB = require("./config/db");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes  = require("./routes/userRoutes");

const app = express();

// Relaxed and secure CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://chargevita.in",
  "https://www.chargevita.in"
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// Body parser
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve static files (e.g. images)
app.use("/public", express.static(path.join(__dirname, "public")));

// Mount your remaining API routes
app.use("/api/orders", orderRoutes);
app.use("/api/admin",  adminRoutes);
app.use("/api/users",  userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("E-commerce Backend Running with Shiprocket 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
