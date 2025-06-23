const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const shiprocketRoutes = require("./routes/shiprocketRoutes");

const app = express();

const allowedOrigins = ["http://localhost:5173", "https://chargevita.in"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Add this line
}));
app.use(express.json());
connectDB();
app.use('/uploads', express.static('uploads'));

app.use('/api/admin', adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shiprocket", shiprocketRoutes);

app.get("/", (req, res) => {
  res.send("E-commerce Backend Running with Shiprocket");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
