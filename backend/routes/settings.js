const express = require("express");
const router = express.Router();
const pool = require("../db");
const { auth } = require("../middleware/auth");

// Get user settings
router.get("/", auth, async (req, res) => {
    try {
        let settings = await pool.query(
            "SELECT * FROM user_settings WHERE user_id = $1",
            [req.user.id]
        );

        // Create default settings if they don't exist
        if (settings.rows.length === 0) {
            settings = await pool.query(
                `INSERT INTO user_settings (user_id) 
                 VALUES ($1) 
                 RETURNING *`,
                [req.user.id]
            );
        }

        res.json(settings.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Update user settings
router.put("/", auth, async (req, res) => {
    const { email_notifications, push_notifications, theme, language, timezone } = req.body;

    try {
        // Check if settings exist
        const existing = await pool.query(
            "SELECT * FROM user_settings WHERE user_id = $1",
            [req.user.id]
        );

        let settings;
        if (existing.rows.length === 0) {
            // Create new settings
            settings = await pool.query(
                `INSERT INTO user_settings 
                 (user_id, email_notifications, push_notifications, theme, language, timezone) 
                 VALUES ($1, $2, $3, $4, $5, $6) 
                 RETURNING *`,
                [
                    req.user.id,
                    email_notifications !== undefined ? email_notifications : true,
                    push_notifications !== undefined ? push_notifications : true,
                    theme || 'light',
                    language || 'en',
                    timezone || 'UTC'
                ]
            );
        } else {
            // Update existing settings
            settings = await pool.query(
                `UPDATE user_settings 
                 SET email_notifications = COALESCE($1, email_notifications),
                     push_notifications = COALESCE($2, push_notifications),
                     theme = COALESCE($3, theme),
                     language = COALESCE($4, language),
                     timezone = COALESCE($5, timezone),
                     updated_at = NOW()
                 WHERE user_id = $6
                 RETURNING *`,
                [email_notifications, push_notifications, theme, language, timezone, req.user.id]
            );
        }

        res.json(settings.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Reset settings to default
router.post("/reset", auth, async (req, res) => {
    try {
        const settings = await pool.query(
            `UPDATE user_settings 
             SET email_notifications = TRUE,
                 push_notifications = TRUE,
                 theme = 'light',
                 language = 'en',
                 timezone = 'UTC',
                 updated_at = NOW()
             WHERE user_id = $1
             RETURNING *`,
            [req.user.id]
        );

        res.json(settings.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
