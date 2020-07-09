const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/.env" });
const app = express();

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Connect to database
connectDB();

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
