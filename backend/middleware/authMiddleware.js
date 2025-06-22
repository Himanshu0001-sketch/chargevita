const isAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === process.env.ADMIN_TOKEN) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized admin" });
  }
};

module.exports = { isAdmin };
