// Hardcoded static admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";

const isAdmin = (req, res, next) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { isAdmin };
