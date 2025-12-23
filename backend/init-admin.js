require("dotenv").config();
const pool = require("./db");

const initAdmin = async () => {
    const email = 'admin@ruralshores.com';
    const pass = 'admin123';
    const name = 'Super Admin';
    const role = 'ADMIN';

    try {
        console.log(`Initializing Admin (Plain Text): ${email}...`);

        // NO HASHING - Saving plain text
        const plainPassword = pass;

        // Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length > 0) {
            // Update existing
            await pool.query(
                "UPDATE users SET password = $1, role = $2, name = $3 WHERE email = $4",
                [plainPassword, role, name, email]
            );
            console.log("Admin account updated to Plain Text successfully!");
        } else {
            // Insert new
            await pool.query(
                "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
                [name, email, plainPassword, role]
            );
            console.log("Admin account created with Plain Text successfully!");
        }
        process.exit();
    } catch (err) {
        console.error("DETAILED ERROR:", err);
        process.exit(1);
    }
};

initAdmin();
