# 📋 Deployment Checklist

Use this checklist to track your deployment progress.

---

## ✅ Pre-Deployment Tasks

- [ ] **Create GitHub account** (if you don't have one)
- [ ] **Create Vercel account** (sign up with GitHub)
- [ ] **Create Render account** (sign up with GitHub)
- [ ] **Install Git** on your computer
- [ ] **Review DEPLOYMENT_OPTIONS.md** and choose your platform

---

## 📦 Step 1: Prepare Project

- [ ] Update API calls to use environment variables
  - [ ] Import `API_ENDPOINTS` from `src/config/api.js`
  - [ ] Replace hardcoded URLs in all files
- [ ] Create `.env.production` file (already created ✓)
- [ ] Create `vercel.json` file (already created ✓)
- [ ] Test build locally: `npm run build`
- [ ] Verify no build errors

---

## 🔧 Step 2: Git & GitHub

- [ ] Initialize Git repository: `git init`
- [ ] Add all files: `git add .`
- [ ] Create initial commit: `git commit -m "Initial commit"`
- [ ] Create GitHub repository at https://github.com/new
  - Repository name: `ruralshores-portal`
  - Visibility: **Public** (required for free hosting)
- [ ] Add remote: `git remote add origin <your-repo-url>`
- [ ] Push to GitHub: `git push -u origin main`
- [ ] Verify files are on GitHub

---

## 🗄️ Step 3: Deploy Database (Render)

- [ ] Go to https://dashboard.render.com
- [ ] Click "New +" → "PostgreSQL"
- [ ] Configure database:
  - [ ] Name: `ruralshores-db`
  - [ ] Database: `ruralshores`
  - [ ] Region: Choose closest to you
  - [ ] Plan: **Free**
- [ ] Click "Create Database"
- [ ] **Copy Internal Database URL** (save it somewhere safe!)
- [ ] Wait for database to be ready (green status)

---

## 🖥️ Step 4: Deploy Backend (Render)

- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Configure service:
  - [ ] Name: `ruralshores-backend`
  - [ ] Region: Same as database
  - [ ] Branch: `main`
  - [ ] Root Directory: `backend`
  - [ ] Runtime: `Node`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
  - [ ] Plan: **Free**
- [ ] Add Environment Variables:
  - [ ] `DATABASE_URL` = <your database URL>
  - [ ] `PORT` = `10000`
  - [ ] `JWT_SECRET` = <create a strong secret>
  - [ ] `NODE_ENV` = `production`
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 minutes)
- [ ] **Copy backend URL** (e.g., `https://ruralshores-backend.onrender.com`)
- [ ] Test backend: Visit `<backend-url>/api/health` (should return OK)

---

## 🎨 Step 5: Update Frontend for Production

- [ ] Update `.env.production` with your actual backend URL
- [ ] Update backend CORS settings:
  - [ ] Add your Vercel domain to allowed origins
  - [ ] Add `https://*.vercel.app` for preview deployments
- [ ] Commit changes: `git add . && git commit -m "Add production config"`
- [ ] Push to GitHub: `git push`

---

## 🚀 Step 6: Deploy Frontend (Vercel)

- [ ] Go to https://vercel.com/new
- [ ] Import your GitHub repository
- [ ] Configure project:
  - [ ] Framework Preset: **Vite**
  - [ ] Root Directory: `./` (leave as root)
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
- [ ] Add Environment Variable:
  - [ ] `VITE_API_URL` = <your backend URL>
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-5 minutes)
- [ ] **Copy frontend URL** (e.g., `https://ruralshores-portal.vercel.app`)

---

## 🔄 Step 7: Post-Deployment Configuration

- [ ] Update backend CORS (if not done in Step 5)
- [ ] Initialize database tables:
  - [ ] Run migration scripts
  - [ ] Seed initial data
- [ ] Test all functionality:
  - [ ] User registration
  - [ ] User login
  - [ ] Admin features
  - [ ] GenAI features
  - [ ] Forms and submissions

---

## ✨ Step 8: Final Touches

- [ ] Add custom domain (optional)
- [ ] Set up UptimeRobot to prevent backend sleep (optional)
- [ ] Configure environment-specific settings
- [ ] Update README.md with live URLs
- [ ] Share your app! 🎉

---

## 🎯 Your Live URLs

**Frontend**: ___________________________________

**Backend**: ___________________________________

**Database**: (Internal only, not public)

---

## 🆘 Troubleshooting

### Build Fails
- [ ] Check build logs in Vercel/Render dashboard
- [ ] Ensure all dependencies are in `package.json`
- [ ] Test build locally: `npm run build`

### CORS Errors
- [ ] Verify backend CORS includes Vercel domain
- [ ] Check browser console for exact error
- [ ] Ensure credentials are properly configured

### Database Connection Issues
- [ ] Verify `DATABASE_URL` environment variable
- [ ] Ensure database and backend are in same region
- [ ] Check database status in Render dashboard

### Backend Not Responding
- [ ] Check if backend is sleeping (first request takes 30-60s)
- [ ] View logs in Render dashboard
- [ ] Verify environment variables are set correctly

---

## 📱 Keep Backend Awake (Optional)

- [ ] Sign up for UptimeRobot: https://uptimerobot.com
- [ ] Create new monitor:
  - [ ] Type: HTTP(s)
  - [ ] URL: `<your-backend-url>/api/health`
  - [ ] Interval: 10 minutes
- [ ] Activate monitor

---

## 🎉 Congratulations!

Your RuralShores Portal is now live and accessible worldwide!

**Next Steps:**
- Share with your team
- Monitor performance
- Gather user feedback
- Iterate and improve

---

**Deployment Date**: _______________

**Deployed By**: _______________

**Notes**: 
_______________________________________________
_______________________________________________
_______________________________________________
