import.meta.env.VITE_API_URL
require("dotenv").config(); // MUST be first

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load Routes
const authRoutes = require("./routes/auth");
const serviceRoutes = require("./routes/services");
const profileRoutes = require("./routes/profile");
const aiRoutes = require("./routes/aiProjects");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/ai-projects", aiRoutes);

// Health Check
app.get("/", (req, res) => {
    res.send("RuralShores API is Running");
});

// Test DB Connection
app.get("/api/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ success: true, time: result.rows[0].now });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Database connection failed" });
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
