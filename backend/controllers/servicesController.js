const pool = require("../db");

exports.getServices = async (req, res) => {
    try {
        const services = await pool.query("SELECT * FROM services ORDER BY id ASC");
        res.json(services.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

exports.addService = async (req, res) => {
    const { id, title, description, icon, image_url, link, key_benefits, use_cases, deliverables, is_active } = req.body;
    try {
        if (id) {
            // Update existing service
            const updated = await pool.query(
                "UPDATE services SET title=$1, description=$2, icon=$3, image_url=$4, link=$5, key_benefits=$6, use_cases=$7, deliverables=$8, is_active=$9 WHERE id=$10 RETURNING *",
                [title, description, icon, image_url, link, key_benefits, use_cases, deliverables, is_active, id]
            );
            return res.json(updated.rows[0]);
        } else {
            // Create new service
            const newService = await pool.query(
                "INSERT INTO services (title, description, icon, image_url, link, key_benefits, use_cases, deliverables, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
                [title, description, icon, image_url, link, key_benefits, use_cases, deliverables, is_active !== undefined ? is_active : true]
            );
            return res.json(newService.rows[0]);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
exports.deleteService = async (req, res) => {
    try {
        await pool.query("DELETE FROM services WHERE id = $1", [req.params.id]);
        res.json({ msg: "Service deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
