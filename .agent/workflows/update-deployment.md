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

## 2. Automatic Database Update (Render Free Tier)

Since Render Free Tier does not allow shell access, I have **automated** the database update process.

- **No manual action required**: Every time you push to GitHub, the backend will automatically restart.
- **Auto-Sync**: On startup, the server will now automatically create the new tables (Tickets, Notifications) and reset the admin credentials to `admin123`.

**Wait about 3-5 minutes** for Render to finish the deployment.

---

## 3. Verify Live Site

1.  Open your **Vercel Frontend URL** (e.g., `https://ruralshores-portal.vercel.app`).
2.  Go to **/contact** and try submitting a form.
3.  Go to **/admin/login**.
    *   **Email**: `admin@ruralshores.com`
    *   **Password**: `admin123`
4.  Check the **Support Tickets** page to see your form submission.

✅ **Done! Your live app is now fully up to date.**
