require("dotenv").config(); // MUST be first
const runDbSync = require("./production-tools");

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
const supportTicketsRoutes = require("./routes/supportTickets");
const notificationsRoutes = require("./routes/notifications");
const settingsRoutes = require("./routes/settings");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/ai-projects", aiRoutes);
app.use("/api/support-tickets", supportTicketsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/settings", settingsRoutes);

// Health Check
app.get("/", (req, res) => {
    res.send("RuralShores API is Running");
});

// Test DB Connection
app.get("/api/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ success: true, time: result.rows[0].now, config: process.env.DATABASE_URL ? 'URL' : 'Params' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Debug Tables (Helper for production issues)
app.get("/api/debug/tables", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        const userCount = await pool.query("SELECT COUNT(*) FROM users").catch(() => ({ rows: [{ count: 'fail' }] }));
        res.json({
            tables: result.rows.map(r => r.table_name),
            userCount: userCount.rows[0].count
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    // Auto-sync DB on startup
    await runDbSync();
});
