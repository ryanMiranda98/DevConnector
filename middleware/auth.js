const jwt = require("jsonwebtoken");
const config = require("config");

// Exports middlware function
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Token is not valid",
      error: error.message,
    });
  }
};
