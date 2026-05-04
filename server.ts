import express from "express";
import { createServer as createViteServer } from "vite";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "./db.ts";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "eventra-secret-key-2026";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const stmt = db.prepare("INSERT INTO users (email, password, name) VALUES (?, ?, ?)");
      const result = stmt.run(email, hashedPassword, name);
      const token = jwt.sign({ id: result.lastInsertRowid, email, name }, JWT_SECRET);
      res.json({ token, user: { id: result.lastInsertRowid, email, name } });
    } catch (e) {
      res.status(400).json({ error: "User already exists" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET);
      res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Data Routes
  app.get("/api/vendors", (req, res) => {
    const vendors = db.prepare("SELECT * FROM vendors").all();
    res.json(vendors);
  });

  app.get("/api/halls", (req, res) => {
    const halls = db.prepare("SELECT * FROM halls").all();
    res.json(halls);
  });

  app.get("/api/fashion", (req, res) => {
    const fashion = db.prepare("SELECT * FROM fashion").all();
    res.json(fashion);
  });

  app.get("/api/user/bookings/:userId", (req, res) => {
    const bookings = db.prepare(`
      SELECT b.*, 
             CASE 
               WHEN b.item_type = 'hall' THEN h.name 
               WHEN b.item_type = 'vendor' THEN v.name 
               WHEN b.item_type = 'fashion' THEN f.name 
             END as item_name
      FROM bookings b
      LEFT JOIN halls h ON b.item_id = h.id AND b.item_type = 'hall'
      LEFT JOIN vendors v ON b.item_id = v.id AND b.item_type = 'vendor'
      LEFT JOIN fashion f ON b.item_id = f.id AND b.item_type = 'fashion'
      WHERE b.user_id = ?
    `).all(req.params.userId);
    res.json(bookings);
  });

  app.post("/api/bookings", (req, res) => {
    const { userId, itemId, itemType, date } = req.body;
    const stmt = db.prepare("INSERT INTO bookings (user_id, item_id, item_type, booking_date) VALUES (?, ?, ?, ?)");
    stmt.run(userId, itemId, itemType, date);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
