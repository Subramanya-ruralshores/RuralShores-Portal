---
description: Update Deployment (Vercel & Render)
---

# 🚀 Updating Your Live Deployment

Follow these steps to push your latest changes (Contact Form, Admin Dashboard, Notifications) to your live website.

## 1. Push Changes to GitHub

This will automatically trigger a redeploy on both Vercel and Render.

1.  Open your terminal (or CMD).
2.  Navigate to your project folder.
3.  Run these commands:

```bash
git add .
git commit -m "Add Contact Form, Admin Tickets, and Notifications"
git push
```

**Wait about 2-3 minutes** for Vercel and Render to finish building.

---

## 2. Update Production Database (Render)

Your new features require new tables in the database. You must run this script on Render.

1.  Go to your [Render Dashboard](https://dashboard.render.com).
2.  Click on your **Backend Web Service** (e.g., `ruralshores-backend`).
3.  Click on the **"Shell"** tab on the left menu.
4.  Wait for the terminal to connect.
5.  Type the following command and press Enter:

```bash
node production-tools.js
```

### What to expect:
You should see output confirming the updates:
```
🚀 Starting Production Update...
📦 Applying Schema Updates...
✅ Schema updates applied successfully.
👤 key Users & Credentials...
✅ Admin updated: admin@ruralshores.com
✅ Default User updated: user@ruralshores.com
🎉 UPDATE COMPLETE!
```

---

## 3. Verify Live Site

1.  Open your **Vercel Frontend URL** (e.g., `https://ruralshores-portal.vercel.app`).
2.  Go to **/contact** and try submitting a form.
3.  Go to **/admin/login**.
    *   **Email**: `admin@ruralshores.com`
    *   **Password**: `admin123`
4.  Check the **Support Tickets** page to see your form submission.

✅ **Done! Your live app is now fully up to date.**
