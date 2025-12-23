const fs = require("fs");
const path = require("path");
const pool = require("./db");

const runProductionUpdate = async () => {
    console.log("🚀 Starting Production Update...");

    try {
        // 0. Ensure Base Users Table Exists
        console.log("-----------------------------------");
        console.log("🛠️ Checking Base Tables...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(50) DEFAULT 'EMPLOYEE',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("✅ Users table ready.");

        // 1. Apply Schema Updates (Tables)
        console.log("-----------------------------------");
        console.log("📦 Applying Schema Updates...");
        const schemaPath = path.join(__dirname, "schema-updates.sql");
        const sql = fs.readFileSync(schemaPath, "utf8");
        await pool.query(sql);
        console.log("✅ Schema updates applied successfully.");

        // 2. Ensure Admin User Exists & Reset Credentials
        console.log("-----------------------------------");
        console.log("👤 Syncing Users & Credentials...");

        const adminEmail = 'admin@ruralshores.com';
        const adminPass = 'admin123';

        const adminCheck = await pool.query("SELECT * FROM users WHERE email = $1", [adminEmail]);
        if (adminCheck.rows.length > 0) {
            await pool.query(
                "UPDATE users SET password = $1, role = 'ADMIN', name = 'Super Admin' WHERE email = $2",
                [adminPass, adminEmail]
            );
            console.log(`✅ Admin updated: ${adminEmail}`);
        } else {
            await pool.query(
                "INSERT INTO users (name, email, password, role) VALUES ('Super Admin', $1, $2, 'ADMIN')",
                [adminEmail, adminPass]
            );
            console.log(`✅ Admin created: ${adminEmail}`);
        }

        // 3. Ensure Default User Exists
        const userEmail = 'user@ruralshores.com';
        const userPass = 'user123';

        const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [userEmail]);
        if (userCheck.rows.length > 0) {
            await pool.query(
                "UPDATE users SET password = $1, role = 'EMPLOYEE', name = 'Default User' WHERE email = $2",
                [userPass, userEmail]
            );
            console.log(`✅ Default User updated: ${userEmail}`);
        } else {
            await pool.query(
                "INSERT INTO users (name, email, password, role) VALUES ('Default User', $1, $2, 'EMPLOYEE')",
                [userEmail, userPass]
            );
            console.log(`✅ Default User created: ${userEmail}`);
        }

        console.log("-----------------------------------");
        console.log("🎉 DB SYNC COMPLETE!");

    } catch (err) {
        console.error("❌ DB SYNC FAILED:", err);
    }
};

module.exports = runProductionUpdate;
