const express = require("express");
const connectDB = require("./config/db");

const app = express();
const cors = require("cors");

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Connect Database
connectDB();

app.get("/", (req, res) => {
  res.send("API running");
});

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// Setup port for listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
