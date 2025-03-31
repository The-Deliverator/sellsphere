const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./config/db");

dotenv.config();

const app = express();

// ✅ CORS configuration
app.use(
  cors({
    origin: [
      "https://sellsphere-frontend.onrender.com", // 🔗 Frontend on Render
      "https://sellsphere-production-5dca.up.railway.app", // ✅ Backend on Railway (so it can call itself if needed)
      "http://localhost:3000",
      "http://localhost:3001"
    ],
    credentials: true
  })
);

app.use(express.json());

// 🗂️ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔍 Health check
app.get("/", (req, res) => {
  res.send("SellSphere backend running 🛒");
});

// 🛠️ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

// 🚀 Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));