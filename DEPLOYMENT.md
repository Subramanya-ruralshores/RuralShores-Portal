# 🚀 Quick Deployment Guide

## Free Hosting Platforms Used

- **Frontend**: Vercel (https://vercel.com)
- **Backend**: Render (https://render.com)
- **Database**: Render PostgreSQL

## Quick Start

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/ruralshores-portal.git
   git push -u origin main
   ```

2. **Deploy Database** (Render)
   - Create PostgreSQL database on Render
   - Copy the Internal Database URL

3. **Deploy Backend** (Render)
   - Create Web Service from GitHub repo
   - Root Directory: `backend`
   - Add environment variables (DATABASE_URL, JWT_SECRET, etc.)

4. **Deploy Frontend** (Vercel)
   - Import GitHub repo
   - Framework: Vite
   - Add VITE_API_URL environment variable

## Environment Variables

### Backend (.env)
```
DATABASE_URL=<from Render PostgreSQL>
PORT=10000
JWT_SECRET=your_secret_key_here
NODE_ENV=production
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend.onrender.com
```

## Post-Deployment

1. Update backend CORS to allow Vercel domain
2. Initialize database tables
3. Test all functionality

For detailed instructions, see `.agent/workflows/deploy-to-web.md`
