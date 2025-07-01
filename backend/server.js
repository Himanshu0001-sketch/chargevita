// backend/server.js
const express   = require("express");
const cors      = require("cors");
const path      = require("path");
const connectDB = require("./config/db");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");

const app = express();

// CORS
const allowedOrigins = ["http://localhost:5173","https://chargevita.in","https://www.chargevita.in"];
app.use(cors({
  origin: (origin, cb) =>
    !origin || allowedOrigins.includes(origin)
      ? cb(null, true)
      : cb(new Error("Not allowed by CORS")),
  credentials: true,
  methods: ["GET","POST","OPTIONS","DELETE"],
}));

app.use(express.json());
connectDB();

// Serve public images
app.use(express.static(path.join(__dirname,"public")));

// Orders API
app.use("/api/orders", orderRoutes);

// Health check
app.get("/", (req, res) => res.send("Backend up 🚀"));

// 404 + global error
app.use((req, res) => res.status(404).json({ message: "Not Found" }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status||500).json({ message: err.message||"Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
