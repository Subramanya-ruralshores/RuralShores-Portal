const express = require("express");
const router = express.Router();
const pool = require("../db");
const { auth, adminAuth } = require("../middleware/auth");

// Submit a support ticket (public - no auth required)
router.post("/", async (req, res) => {
    const { name, email, category, subject, message } = req.body;

    try {
        const newTicket = await pool.query(
            `INSERT INTO support_tickets (name, email, category, subject, message, status, priority) 
             VALUES ($1, $2, $3, $4, $5, 'open', 'medium') 
             RETURNING *`,
            [name, email, category, subject || category, message]
        );

        // Create notification for admins
        const admins = await pool.query("SELECT id FROM users WHERE role = 'ADMIN'");
        for (const admin of admins.rows) {
            await pool.query(
                `INSERT INTO notifications (user_id, title, message, type, link) 
                 VALUES ($1, $2, $3, $4, $5)`,
                [
                    admin.id,
                    'New Support Ticket',
                    `New ticket from ${name}: ${subject || category}`,
                    'ticket',
                    `/admin/support-tickets/${newTicket.rows[0].id}`
                ]
            );
        }

        res.json({
            success: true,
            message: "Support ticket submitted successfully! We'll get back to you within 24 hours.",
            ticket: newTicket.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Get all tickets (admin only)
router.get("/", adminAuth, async (req, res) => {
    try {
        const { status, priority, search } = req.query;

        let query = "SELECT * FROM support_tickets WHERE 1=1";
        const params = [];
        let paramCount = 1;

        if (status) {
            query += ` AND status = $${paramCount}`;
            params.push(status);
            paramCount++;
        }

        if (priority) {
            query += ` AND priority = $${paramCount}`;
            params.push(priority);
            paramCount++;
        }

        if (search) {
            query += ` AND (name ILIKE $${paramCount} OR email ILIKE $${paramCount} OR message ILIKE $${paramCount})`;
            params.push(`%${search}%`);
            paramCount++;
        }

        query += " ORDER BY created_at DESC";

        const tickets = await pool.query(query, params);
        res.json(tickets.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get single ticket
router.get("/:id", adminAuth, async (req, res) => {
    try {
        const ticket = await pool.query(
            "SELECT * FROM support_tickets WHERE id = $1",
            [req.params.id]
        );

        if (ticket.rows.length === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.json(ticket.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Update ticket status
router.patch("/:id/status", adminAuth, async (req, res) => {
    const { status } = req.body;

    try {
        const resolvedAt = status === 'resolved' ? new Date() : null;

        const updatedTicket = await pool.query(
            `UPDATE support_tickets 
             SET status = $1, updated_at = NOW(), resolved_at = $2 
             WHERE id = $3 
             RETURNING *`,
            [status, resolvedAt, req.params.id]
        );

        if (updatedTicket.rows.length === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.json(updatedTicket.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Update ticket priority
router.patch("/:id/priority", adminAuth, async (req, res) => {
    const { priority } = req.body;

    try {
        const updatedTicket = await pool.query(
            `UPDATE support_tickets 
             SET priority = $1, updated_at = NOW() 
             WHERE id = $2 
             RETURNING *`,
            [priority, req.params.id]
        );

        if (updatedTicket.rows.length === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.json(updatedTicket.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Assign ticket to admin
router.patch("/:id/assign", adminAuth, async (req, res) => {
    const { assignedTo } = req.body;

    try {
        const updatedTicket = await pool.query(
            `UPDATE support_tickets 
             SET assigned_to = $1, updated_at = NOW() 
             WHERE id = $2 
             RETURNING *`,
            [assignedTo, req.params.id]
        );

        if (updatedTicket.rows.length === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.json(updatedTicket.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Delete ticket
router.delete("/:id", adminAuth, async (req, res) => {
    try {
        const deletedTicket = await pool.query(
            "DELETE FROM support_tickets WHERE id = $1 RETURNING *",
            [req.params.id]
        );

        if (deletedTicket.rows.length === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.json({ message: "Ticket deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get ticket statistics (admin only)
router.get("/stats/overview", adminAuth, async (req, res) => {
    try {
        const stats = await pool.query(`
            SELECT 
                COUNT(*) as total,
                COUNT(*) FILTER (WHERE status = 'open') as open,
                COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress,
                COUNT(*) FILTER (WHERE status = 'resolved') as resolved,
                COUNT(*) FILTER (WHERE priority = 'high') as high_priority,
                COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as last_24h
            FROM support_tickets
        `);

        res.json(stats.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
