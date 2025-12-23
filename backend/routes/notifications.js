const express = require("express");
const router = express.Router();
const pool = require("../db");
const { auth } = require("../middleware/auth");

// Get user notifications
router.get("/", auth, async (req, res) => {
    try {
        const notifications = await pool.query(
            `SELECT * FROM notifications 
             WHERE user_id = $1 
             ORDER BY created_at DESC 
             LIMIT 50`,
            [req.user.id]
        );

        res.json(notifications.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get unread count
router.get("/unread/count", auth, async (req, res) => {
    try {
        const count = await pool.query(
            "SELECT COUNT(*) as unread FROM notifications WHERE user_id = $1 AND is_read = FALSE",
            [req.user.id]
        );

        res.json({ unread: parseInt(count.rows[0].unread) });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Mark notification as read
router.patch("/:id/read", auth, async (req, res) => {
    try {
        const notification = await pool.query(
            "UPDATE notifications SET is_read = TRUE WHERE id = $1 AND user_id = $2 RETURNING *",
            [req.params.id, req.user.id]
        );

        if (notification.rows.length === 0) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.json(notification.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Mark all as read
router.patch("/read-all", auth, async (req, res) => {
    try {
        await pool.query(
            "UPDATE notifications SET is_read = TRUE WHERE user_id = $1 AND is_read = FALSE",
            [req.user.id]
        );

        res.json({ message: "All notifications marked as read" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Delete notification
router.delete("/:id", auth, async (req, res) => {
    try {
        const deleted = await pool.query(
            "DELETE FROM notifications WHERE id = $1 AND user_id = $2 RETURNING *",
            [req.params.id, req.user.id]
        );

        if (deleted.rows.length === 0) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.json({ message: "Notification deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Create notification (for testing or admin use)
router.post("/", auth, async (req, res) => {
    const { title, message, type, link } = req.body;

    try {
        const notification = await pool.query(
            `INSERT INTO notifications (user_id, title, message, type, link) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING *`,
            [req.user.id, title, message, type || 'info', link]
        );

        res.json(notification.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
