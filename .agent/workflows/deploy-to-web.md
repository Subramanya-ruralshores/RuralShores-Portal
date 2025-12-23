---
description: Deploy RuralShores Portal to Web for Free
---

# 🚀 Free Web Deployment Guide

This guide will help you deploy your full-stack RuralShores Portal application for **FREE** using Vercel (Frontend) and Render (Backend + Database).

---

## 📦 Prerequisites

1. **GitHub Account** (create at https://github.com if you don't have one)
2. **Vercel Account** (sign up at https://vercel.com with GitHub)
3. **Render Account** (sign up at https://render.com with GitHub)
4. **Git installed** on your computer

---

## 🔧 PART 1: Prepare Your Project

### Step 1: Initialize Git Repository (if not already done)

```bash
cd "c:\Users\RS24451\OneDrive - RuralShores Business Pvt Ltd\Documents\MyReact\Ruralshores-portal"
git init
git add .
git commit -m "Initial commit - RuralShores Portal"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ruralshores-portal`
3. Make it **Public** (required for free hosting)
4. Click "Create repository"

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/ruralshores-portal.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## 🗄️ PART 2: Deploy Backend + Database on Render

### Step 1: Create PostgreSQL Database

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `ruralshores-db`
   - **Database**: `ruralshores`
   - **User**: `ruralshores_user` (auto-generated)
   - **Region**: Choose closest to your users
   - **Plan**: **Free**
4. Click **"Create Database"**
5. **IMPORTANT**: Copy the **Internal Database URL** (starts with `postgresql://`)

### Step 2: Deploy Backend Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `ruralshores-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

4. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable":
   ```
   DATABASE_URL = <paste your Internal Database URL from Step 1>
   PORT = 10000
   JWT_SECRET = your_super_secret_jwt_key_here_change_this
   NODE_ENV = production
   ```

5. Click **"Create Web Service"**

6. **Copy your backend URL** (e.g., `https://ruralshores-backend.onrender.com`)

---

## 🎨 PART 3: Deploy Frontend on Vercel

### Step 1: Update Frontend API URL

Before deploying, update your frontend to use the production backend URL:

1. Create a `.env.production` file in the frontend root:
   ```
   VITE_API_URL=https://ruralshores-backend.onrender.com
   ```

2. Update your API calls to use `import.meta.env.VITE_API_URL`

3. Commit and push changes:
   ```bash
   git add .
   git commit -m "Add production environment variables"
   git push
   ```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables**:
   ```
   VITE_API_URL = https://ruralshores-backend.onrender.com
   ```

5. Click **"Deploy"**

6. **Your app is live!** 🎉
   - Vercel will give you a URL like: `https://ruralshores-portal.vercel.app`

---

## ✅ PART 4: Post-Deployment Setup

### Step 1: Update Backend CORS

Update your backend's CORS configuration to allow your Vercel domain:

In `backend/index.js`, update CORS:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ruralshores-portal.vercel.app', // Add your Vercel URL
    'https://*.vercel.app' // Allow all Vercel preview deployments
  ],
  credentials: true
}));
```

Commit and push - Render will auto-deploy.

### Step 2: Initialize Database Tables

Run your database migrations/initialization scripts on the Render PostgreSQL database.

---

## 🎯 Alternative: All-in-One Deployment Options

### Option A: Deploy Everything on Render

1. Deploy PostgreSQL (as above)
2. Deploy Backend (as above)
3. Deploy Frontend as Static Site:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

### Option B: Deploy on Railway (All-in-One)

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway will auto-detect and deploy both frontend and backend
5. Add PostgreSQL from Railway's plugin marketplace

### Option C: Deploy on Netlify + Render

Same as Vercel + Render, but use Netlify for frontend.

---

## 🔄 Continuous Deployment

Both Vercel and Render support **automatic deployments**:
- Every time you push to GitHub, your app automatically redeploys
- No manual steps needed after initial setup

---

## ⚠️ Important Notes

### Free Tier Limitations:

**Render Free Tier:**
- Backend spins down after 15 minutes of inactivity
- First request after sleep takes ~30-60 seconds (cold start)
- Database deleted after 90 days of inactivity

**Vercel Free Tier:**
- 100GB bandwidth/month
- No sleep time
- Unlimited deployments

### Keeping Backend Awake (Optional):

Use a free uptime monitoring service like:
- **UptimeRobot** (https://uptimerobot.com)
- **Cron-job.org** (https://cron-job.org)

Set it to ping your backend every 10 minutes.

---

## 🆘 Troubleshooting

### Backend not connecting to database:
- Check DATABASE_URL environment variable
- Ensure database is in same region as backend

### CORS errors:
- Update backend CORS to include your Vercel domain
- Check browser console for exact error

### Build failures:
- Check build logs in Vercel/Render dashboard
- Ensure all dependencies are in `package.json`
- Check Node version compatibility

---

## 📱 Custom Domain (Optional)

Both Vercel and Render support custom domains for free:

1. **Vercel**: Settings → Domains → Add Domain
2. **Render**: Settings → Custom Domain → Add Domain

You'll need to update your DNS records (A/CNAME) with your domain provider.

---

## 🎉 You're Done!

Your RuralShores Portal is now live and accessible worldwide for **FREE**!

**Frontend URL**: `https://ruralshores-portal.vercel.app`  
**Backend URL**: `https://ruralshores-backend.onrender.com`

Share your app with the world! 🌍
