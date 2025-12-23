# 🔐 Admin Credentials & Database Setup

## ✅ Default Admin Login Credentials

```
Email:    admin@ruralshores.com
Password: admin123
```

---

## 🗄️ Database Initialization

### **For Local Development**

1. **Create Admin User**
   ```bash
   cd backend
   node init-admin.js
   ```

2. **Seed Services Data** (Optional)
   ```bash
   node seed.js
   ```

3. **Verify Database**
   ```bash
   node test-db.js
   ```

---

### **For Production (Render)**

After deploying your backend to Render, you need to initialize the database:

#### **Method 1: Using Render Shell (Recommended)**

1. Go to your Render Dashboard
2. Click on your backend service
3. Click **"Shell"** tab
4. Run these commands:
   ```bash
   node init-admin.js
   node seed.js
   ```

#### **Method 2: Using Pre-Deploy Command**

In Render service settings:
- **Pre-Deploy Command**: `node init-admin.js && node seed.js`

This will automatically run every time you deploy.

---

## 📋 Database Schema

Make sure your database has the required tables. Run this SQL:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'EMPLOYEE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    icon VARCHAR(100),
    link VARCHAR(255),
    key_benefits TEXT[],
    use_cases TEXT[],
    deliverables TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add more tables as needed
```

---

## 🔄 Reset Admin Password

If you need to reset the admin password:

```bash
cd backend
node init-admin.js
```

This will update the existing admin account with the default password.

---

## 🚀 Production Deployment Checklist

- [ ] Deploy backend to Render
- [ ] Create PostgreSQL database on Render
- [ ] Add environment variables (DATABASE_URL, JWT_SECRET, etc.)
- [ ] Run database schema (schema.sql)
- [ ] Initialize admin user (init-admin.js)
- [ ] Seed initial data (seed.js)
- [ ] Test admin login
- [ ] Deploy frontend to Vercel
- [ ] Update CORS settings

---

## 🔒 Security Notes

⚠️ **IMPORTANT**: The current setup uses **plain text passwords** for simplicity. 

For production, you should:
1. Use bcrypt for password hashing
2. Change the default admin password
3. Implement password strength requirements
4. Add rate limiting for login attempts

---

## 🆘 Troubleshooting

### "Invalid Credentials" Error

**Possible causes:**
1. Admin user not created in database
2. Database connection failed
3. Wrong email/password
4. Database tables not created

**Solutions:**
1. Run `node init-admin.js` in backend
2. Check DATABASE_URL in .env
3. Verify credentials: `admin@ruralshores.com` / `admin123`
4. Check backend logs for errors

### Database Connection Failed

1. Check `.env` file has correct DATABASE_URL
2. Verify PostgreSQL is running
3. Check database credentials
4. Test connection: `node test-db.js`

### Admin User Exists But Can't Login

1. Reset admin password: `node init-admin.js`
2. Check backend logs for errors
3. Verify JWT_SECRET is set in .env
4. Clear browser cache and try again

---

## 📱 Creating Additional Admin Users

You can create more admin users by:

1. **Using the signup endpoint** with role='ADMIN'
2. **Modifying init-admin.js** to create multiple admins
3. **Directly in database** (not recommended)

Example for multiple admins:

```javascript
// Create in init-admin.js
const admins = [
  { email: 'admin@ruralshores.com', password: 'admin123', name: 'Super Admin' },
  { email: 'manager@ruralshores.com', password: 'manager123', name: 'Manager' }
];
```

---

## 🎯 Quick Commands Reference

```bash
# Initialize admin user
node init-admin.js

# Seed services data
node seed.js

# Test database connection
node test-db.js

# Reset to plain text password
node reset-plain.js

# Restore services
node restore-services.js
```

---

## 📊 User Roles

Your system supports these roles:

- **ADMIN**: Full access to admin portal
- **EMPLOYEE**: Regular user access
- **MANAGER**: (if implemented) Mid-level access

Role is set during signup or in init-admin.js

---

## 🔐 Environment Variables Required

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/ruralshores
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Production (Render)
```
DATABASE_URL=<from Render PostgreSQL>
JWT_SECRET=ruralshores_jwt_secret_2024_production
PORT=10000
NODE_ENV=production
```

---

## ✅ Verification Steps

After setup, verify everything works:

1. **Test backend health**
   ```
   http://localhost:5000/
   Should return: "RuralShores API is Running"
   ```

2. **Test database connection**
   ```
   http://localhost:5000/api/db-test
   Should return: {"success": true, "time": "..."}
   ```

3. **Test admin login**
   - Go to frontend
   - Navigate to admin login
   - Use: admin@ruralshores.com / admin123
   - Should successfully log in

---

## 🎉 Success!

Once you can log in with the admin credentials, you're all set!

**Next steps:**
- Change the default password
- Create additional users
- Start using the admin portal
- Deploy to production

---

**Need help?** Check the backend logs or run `node test-db.js` to diagnose issues.
