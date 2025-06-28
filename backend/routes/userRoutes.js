const express = require("express");
const { register, login } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// User registration and login routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;
