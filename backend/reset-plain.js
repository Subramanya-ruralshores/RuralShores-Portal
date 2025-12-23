require("dotenv").config();
const pool = require("./db");

const clearPasswords = async () => {
    try {
        console.log("Setting all passwords to common plain text defaults...");

        // Update admin
        await pool.query("UPDATE users SET password = 'admin123' WHERE email = 'admin@ruralshores.com'");

        // Update user (if exists)
        await pool.query("UPDATE users SET password = 'user123' WHERE email = 'subramanya@rs.com'");

        console.log("Success! Users table is now visible in plain text.");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

clearPasswords();
