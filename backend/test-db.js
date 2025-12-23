require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

pool.query("SELECT * FROM users", (err, res) => {
    if (err) {
        console.error("DB Error:", err.message);
    } else {
        console.log("DB Success:", res.rows.length, "users found");
    }
    pool.end();
});
