const jwt = require("jsonwebtoken");
const pool = require("../db");

exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length > 0) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const newUser = await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
            [name, email, password, role || 'EMPLOYEE']
        );

        const token = jwt.sign(
            { id: newUser.rows[0].id, role: newUser.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: "10h" }
        );

        res.json({ token, user: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const isMatch = (password === user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: user.rows[0].id, role: user.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: "10h" }
        );

        res.json({
            token,
            user: {
                id: user.rows[0].id,
                name: user.rows[0].name,
                email: user.rows[0].email,
                role: user.rows[0].role
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT id, name, email, role FROM users WHERE id = $1",
            [req.user.id]
        );
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
