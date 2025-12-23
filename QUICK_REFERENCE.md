# 🚀 Quick Deployment Reference Card

## 📋 TL;DR - Deploy in 20 Minutes

1. **Push to GitHub** → `git push`
2. **Render** → Create PostgreSQL + Backend
3. **Vercel** → Deploy Frontend
4. **Done!** ✅

---

## 🔗 Important Links

| Service | URL | Purpose |
|---------|-----|---------|
| **Vercel** | https://vercel.com | Frontend hosting |
| **Render** | https://render.com | Backend + Database |
| **GitHub** | https://github.com | Code repository |
| **UptimeRobot** | https://uptimerobot.com | Keep backend awake |

---

## 📁 Files Created for You

| File | Purpose |
|------|---------|
| `DEPLOYMENT_OPTIONS.md` | Compare all hosting platforms |
| `DEPLOYMENT_CHECKLIST.md` | Step-by-step checklist |
| `DEPLOYMENT.md` | Quick start guide |
| `ARCHITECTURE.md` | Visual architecture diagrams |
| `.agent/workflows/deploy-to-web.md` | Detailed deployment workflow |
| `.env.production` | Frontend production config |
| `vercel.json` | Vercel configuration |
| `backend/.env.example` | Backend environment template |
| `src/config/api.js` | Centralized API configuration |

---

## 🎯 Recommended Setup

**Frontend**: Vercel  
**Backend**: Render  
**Database**: Render PostgreSQL  
**Cost**: **FREE** 💰

---

## ⚡ Quick Commands

### Local Development
```bash
# Frontend
npm run dev

# Backend
cd backend && npm run dev
```

### Build for Production
```bash
# Frontend
npm run build

# Backend (no build needed)
npm start
```

### Git Commands
```bash
git add .
git commit -m "Your message"
git push
```

---

## 🔑 Environment Variables

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend.onrender.com
```

### Backend (Render Dashboard)
```
DATABASE_URL=<from Render PostgreSQL>
PORT=10000
JWT_SECRET=<strong secret>
NODE_ENV=production
```

---

## 📊 Free Tier Limits

| Platform | Limit | What happens when exceeded? |
|----------|-------|----------------------------|
| Vercel | 100GB bandwidth/month | Upgrade to Pro ($20/mo) |
| Render Backend | 750 hours/month | Always enough for 1 service |
| Render DB | 1GB storage | Upgrade to paid ($7/mo) |
| Render Sleep | After 15 min inactivity | First request takes 30-60s |

---

## 🆘 Common Issues & Fixes

### ❌ Build fails on Vercel
```bash
# Test locally first
npm run build

# Check package.json has all dependencies
```

### ❌ CORS errors
```javascript
// backend/index.js
app.use(cors({
  origin: ['https://your-app.vercel.app']
}));
```

### ❌ Backend not responding
- Wait 30-60s (cold start)
- Check Render logs
- Verify environment variables

### ❌ Database connection failed
- Check DATABASE_URL
- Ensure backend & DB in same region

---

## 📱 Keep Backend Awake

**Option 1**: UptimeRobot (Free)
- Ping every 10 minutes
- Prevents sleep

**Option 2**: Upgrade to Paid ($7/mo)
- No sleep
- Better performance

---

## 🎨 Your URLs (Fill in after deployment)

**Frontend**: `https://________________________.vercel.app`

**Backend**: `https://________________________.onrender.com`

**GitHub**: `https://github.com/____________/ruralshores-portal`

---

## ✅ Deployment Checklist (Quick)

- [ ] Push to GitHub
- [ ] Create Render PostgreSQL
- [ ] Deploy Render Backend
- [ ] Deploy Vercel Frontend
- [ ] Update CORS
- [ ] Test app
- [ ] 🎉 Share!

---

## 📚 Need More Help?

1. **Detailed Guide**: `.agent/workflows/deploy-to-web.md`
2. **Full Checklist**: `DEPLOYMENT_CHECKLIST.md`
3. **Platform Comparison**: `DEPLOYMENT_OPTIONS.md`
4. **Architecture**: `ARCHITECTURE.md`

---

## 🎯 Next Steps After Deployment

1. **Monitor**: Check Vercel & Render dashboards
2. **Test**: Try all features in production
3. **Optimize**: Review performance metrics
4. **Scale**: Upgrade when needed
5. **Share**: Tell the world! 🌍

---

## 💡 Pro Tips

✅ **Always test builds locally** before deploying  
✅ **Use environment variables** for all configs  
✅ **Monitor logs** regularly  
✅ **Keep dependencies updated**  
✅ **Set up UptimeRobot** to prevent sleep  
✅ **Use Git branches** for testing  

---

## 🏆 Success Criteria

Your deployment is successful when:

✅ Frontend loads at Vercel URL  
✅ Backend responds to API calls  
✅ Database connections work  
✅ User can login/signup  
✅ All features functional  
✅ No console errors  

---

**Deployment Time**: ~20 minutes  
**Cost**: $0/month  
**Difficulty**: ⭐⭐ Easy  

**Good luck! 🚀**
