const pool = require("../db");

exports.getProjects = async (req, res) => {
    try {
        const projects = await pool.query("SELECT * FROM ai_projects ORDER BY created_at DESC");
        res.json(projects.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

exports.addProject = async (req, res) => {
    const { name, description, type } = req.body;
    try {
        const newProject = await pool.query(
            "INSERT INTO ai_projects (name, description, type) VALUES ($1, $2, $3) RETURNING *",
            [name, description, type]
        );
        res.json(newProject.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

exports.deleteProject = async (req, res) => {
    try {
        await pool.query("DELETE FROM ai_projects WHERE id = $1", [req.params.id]);
        res.json({ msg: "Project removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
