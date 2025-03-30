const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

// Save uploaded files to /uploads/
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Middleware: verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

// Upload route
router.post("/upload", verifyToken, upload.single("file"), (req, res) => {
  console.log("🟢 Upload endpoint hit");
  console.log("Body:", req.body);
  console.log("File:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { title, description, price } = req.body;
  const user_id = req.user.id;
  const file_path = req.file.path;

  const query = `
    INSERT INTO products (user_id, title, description, price, file_path)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [user_id, title, description, price, file_path], (err, result) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(201).json({ message: "Product uploaded successfully" });
  });
});

// Get products for logged-in user
router.get("/mine", verifyToken, (req, res) => {
  const user_id = req.user.id;

  const query = "SELECT id, title, description, price, file_path, created_at FROM products WHERE user_id = ?";

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching products:", err);
      return res.status(500).json({ error: "Failed to fetch products" });
    }

    res.json({ products: results });
  });
});

// DELETE a product by ID
router.delete("/:id", verifyToken, (req, res) => {
  const user_id = req.user.id;
  const product_id = req.params.id;

  const query = "DELETE FROM products WHERE id = ? AND user_id = ?";

  db.query(query, [product_id, user_id], (err, result) => {
    if (err) {
      console.error("❌ Failed to delete product:", err);
      return res.status(500).json({ error: "Failed to delete product" });
    }

    if (result.affectedRows === 0) {
      return res.status(403).json({ error: "Not authorized to delete this product" });
    }

    res.json({ message: "Product deleted successfully" });
  });
});

// ✅ EDIT (UPDATE) a product by ID
router.put("/:id", verifyToken, (req, res) => {
  const user_id = req.user.id;
  const product_id = req.params.id;
  const { title, description, price } = req.body;

  const query = `
    UPDATE products
    SET title = ?, description = ?, price = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(query, [title, description, price, product_id, user_id], (err, result) => {
    if (err) {
      console.error("❌ Failed to update product:", err);
      return res.status(500).json({ error: "Failed to update product" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found or unauthorized" });
    }

    res.json({ message: "Product updated successfully" });
  });
});

// ✅ Public route to get all products from all users
router.get("/all", (req, res) => {
  const query = "SELECT id, title, description, price, file_path FROM products ORDER BY created_at DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Failed to fetch all products:", err);
      return res.status(500).json({ error: "Failed to fetch products" });
    }

    res.json({ products: results });
  });
});

module.exports = router;