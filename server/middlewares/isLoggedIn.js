const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

// Middleware to check if user is logged in before accessing protected routes
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(errorHandler(403, "Unauthorized"));
    }
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = isLoggedIn;
