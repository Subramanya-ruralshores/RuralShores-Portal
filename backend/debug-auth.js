require("dotenv").config();
const pool = require("./db");

const debugAuth = async () => {
    console.log("🔍 Starting Local Auth Debug...");

    try {
        // 1. Check DB Connection
        const timeResult = await pool.query("SELECT NOW()");
        console.log("✅ Database Connected: ", timeResult.rows[0].now);

        // 2. List all users
        console.log("\n👥 Current Users in Database:");
        const usersResult = await pool.query("SELECT id, name, email, password, role FROM users");

        if (usersResult.rows.length === 0) {
            console.log("❌ NO USERS FOUND in database!");
        } else {
            console.table(usersResult.rows);
        }

        // 3. Test specific admin search
        const adminEmail = 'admin@ruralshores.com';
        const adminRes = await pool.query("SELECT * FROM users WHERE email = $1", [adminEmail]);
        if (adminRes.rows.length > 0) {
            console.log(`\n✅ Admin found: ${adminEmail}`);
            console.log(`   Password in DB: "${adminRes.rows[0].password}"`);
            console.log(`   Role: ${adminRes.rows[0].role}`);
        } else {
            console.log(`\n❌ Admin NOT FOUND: ${adminEmail}`);
        }

        process.exit();
    } catch (err) {
        console.error("\n❌ DEBUG ERROR:", err.message);
        process.exit(1);
    }
};

debugAuth();
