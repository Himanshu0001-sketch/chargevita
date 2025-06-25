const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const shiprocketRoutes = require("./routes/shiprocketRoutes");

const app = express();

// ✅ Relaxed and secure CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://chargevita.in",
  "https://www.chargevita.in"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ CORS blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json()); // to handle JSON payloads

// ✅ Connect to MongoDB
connectDB();

// ✅ Serve static files (images, etc.)
app.use("/uploads", express.static("uploads"));

// ✅ Mount all API routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shiprocket", shiprocketRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("E-commerce Backend Running with Shiprocket 🚀");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
