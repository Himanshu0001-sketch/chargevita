const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Admin authentication middleware (unchanged)
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === process.env.ADMIN_TOKEN) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized admin" });
  }
};

// User authentication middleware (JWT-based)
const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    console.error("❌ Auth error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { isAdmin, protect };
