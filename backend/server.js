const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./config/db");

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    "https://sellsphere-frontend.onrender.com", // ✅ Live frontend domain (update if needed)
    "http://localhost:3000",
    "http://localhost:3001"
  ],
  credentials: true
}));

app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check route
app.get("/", (req, res) => {
  res.send("SellSphere backend running 🛒");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes")); // ✅ Product routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));