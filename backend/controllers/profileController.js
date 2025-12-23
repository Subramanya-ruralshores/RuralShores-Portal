const pool = require("../db");

exports.getProfile = async (req, res) => {
    try {
        const profile = await pool.query(
            "SELECT p.*, u.name, u.email FROM profiles p JOIN users u ON p.user_id = u.id WHERE u.id = $1",
            [req.user.id]
        );
        if (profile.rows.length === 0) {
            return res.status(404).json({ msg: "Profile not found" });
        }
        res.json(profile.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

exports.updateProfile = async (req, res) => {
    const { designation, department, phone, address } = req.body;
    try {
        let profile = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [req.user.id]);

        if (profile.rows.length === 0) {
            // Create new
            profile = await pool.query(
                "INSERT INTO profiles (user_id, designation, department, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [req.user.id, designation, department, phone, address]
            );
        } else {
            // Update existing
            profile = await pool.query(
                "UPDATE profiles SET designation = $1, department = $2, phone = $3, address = $4 WHERE user_id = $5 RETURNING *",
                [designation, department, phone, address, req.user.id]
            );
        }
        res.json(profile.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
