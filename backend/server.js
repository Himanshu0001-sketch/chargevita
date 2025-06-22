const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const shiprocketRoutes = require("./routes/shiprocketRoutes");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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
