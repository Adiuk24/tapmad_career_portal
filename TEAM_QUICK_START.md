# 🚀 Team Quick Start — 5 Minutes Overview

**Read this first before anything else!**

---

## ❓ What is This Project?

A **Career Portal** — where HR posts jobs and people apply.

**That's it.**

---

## 🎯 What It Does

### HR Can Do:
- ✅ Post jobs
- ✅ See who applied
- ✅ Change status (Pending → Shortlisted → Hired)
- ✅ View job stats & charts
- ✅ Search candidates

### Applicants Can Do:
- ✅ Browse jobs
- ✅ Apply with resume
- ✅ Save jobs to favorites
- ✅ Track application status
- ✅ See when job expires

### Anyone Can Do:
- ✅ Register (HR or Applicant)
- ✅ Login
- ✅ Logout

---

## 👥 Who Gets What Access?

When someone registers, they choose:

- **I'm Hiring (HR)** → See HR Dashboard
- **I'm Job Hunting (Applicant)** → See Job Board

**Only admins can change roles** (not implemented yet, but in roadmap).

---

## 🗂️ How is This Built?

**Frontend (What People See):**
- Next.js + React
- Runs in browser
- Deployed to `frontend.yourdomain.com`

**Backend (Brains of the Operation):**
- Node.js + Express
- Powers all the API
- Deployed to `backend.yourdomain.com`

**Database (Where Data Lives):**
- PostgreSQL
- Stores users, jobs, applications, everything

**Docker (Makes Deployment Easy):**
- One command deploys everything
- Same everywhere (local, test, production)

---

## 📋 Your Role → What You Need to Do

### 👨‍💻 Developers
1. Clone the repo
2. Run local setup (10 min)
3. Open http://localhost:3000 to test
4. Read the API docs if you're building features

### 🔧 DevOps / Deployment Team
1. Get a Linux server (Ubuntu 20+)
2. Follow the deployment guide (30 min with Docker)
3. Point domain names to it
4. Set up SSL (20 min)
5. Done!

### 👔 HR Team / End Users
1. Go to the website
2. Click "Register"
3. Choose "I'm Hiring (HR)"
4. You're in! Start posting jobs

### 📝 Job Applicants
1. Go to the website
2. Click "Register"
3. Choose "I'm Job Hunting (Applicant)"
4. Browse jobs and apply

---

## 🚀 To Get Started

### If You're a Developer:
**Open:** [LOCAL_SETUP_FOR_TEAM.md](LOCAL_SETUP_FOR_TEAM.md)

### If You're Deploying:
**Open:** [DEPLOY_EASY.md](DEPLOY_EASY.md)

### If You're HR:
**Open:** [HR_PORTAL_GUIDE.md](HR_PORTAL_GUIDE.md)

### If You're an Applicant:
**Open:** [APPLICANT_GUIDE.md](APPLICANT_GUIDE.md)

---

## 📁 File Structure (For Developers Only)

```
Project/
├── frontend/          ← Next.js React app (port 3000)
├── backend/           ← Express.js API (port 8000)
├── docker-compose.yml ← Runs everything with 1 command
├── Dockerfile.*       ← Deployment configs
└── README.md          ← Full documentation
```

---

## 🎯 The Complete Setup Path

```
START HERE (you are here)
          ↓
[Choose Your Path]
      ↙   ↓   ↖
  Dev   DevOps  HR/Applicant
   ↓      ↓       ↓
LOCAL  DEPLOY  USE THE APP
SETUP  SERVER
  ↓      ↓       ↓
TEST    LIVE    HIRE!
```

---

## ❓ Quick Questions Answered

**Q: Do I need Docker?**  
A: For developers: No. For deployment: Yes (it's way easier).

**Q: How many users can it handle?**  
A: With current setup: ~1,000 concurrent users. After optimization: way more.

**Q: Is it secure?**  
A: Yes. Passwords hashed, API secured with JWT tokens, CORS enabled, rate limiting on.

**Q: Can I customize it?**  
A: Yes! It's all open source. Read API_REFERENCE.md to understand the endpoints.

**Q: How do I get help?**  
A: → TROUBLESHOOTING.md

---

## 🎬 What Happens When Someone Applies for a Job?

```
1. Applicant fills form + uploads resume
           ↓
2. Backend receives + validates data
           ↓
3. Database stores application
           ↓
4. Email sent to HR (optional)
           ↓
5. HR sees new application in dashboard
           ↓
6. HR changes status to "Shortlisted"
           ↓
7. Applicant gets email notification
           ↓
8. Applicant logs in → sees status changed
           ↓
9. HR can add notes, change to "Hired"
           ↓
10. Applicant sees "Hired" status
           ↓
✅ Hiring complete!
```

---

## 📊 What Data Gets Stored?

✅ User accounts (name, email, password hash)  
✅ Job postings (title, description, salary, requirements)  
✅ Applications (which applicant applied to which job)  
✅ Resumes (file names, not actual files yet — Phase 2)  
✅ Application status history (for audit trail)  
✅ Saved jobs (applicants' favorites)  

**Not stored:**
❌ Passwords (only hashed versions)
❌ IP addresses
❌ Login history (yet — can add)

---

## 🔐 Security Features

✅ Passwords are hashed with bcrypt  
✅ API requests need JWT token  
✅ Rate limiting (200 requests per 15 min)  
✅ CORS enabled (prevents cross-site requests)  
✅ Input validation (Zod schemas)  
✅ SQL injection protection (Prisma ORM)  

---

## 📞 Still Confused?

**Don't worry!** Each guide is step-by-step with examples.

- **Setup questions?** → [LOCAL_SETUP_FOR_TEAM.md](LOCAL_SETUP_FOR_TEAM.md)
- **Deployment questions?** → [DEPLOY_EASY.md](DEPLOY_EASY.md)
- **How to use it?** → [HR_PORTAL_GUIDE.md](HR_PORTAL_GUIDE.md) or [APPLICANT_GUIDE.md](APPLICANT_GUIDE.md)
- **Technical questions?** → [API_REFERENCE.md](API_REFERENCE.md)
- **Something broken?** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 🎯 Next Step

**Choose one:**

| Role | Next Document |
|------|---|
| Developer | [LOCAL_SETUP_FOR_TEAM.md](LOCAL_SETUP_FOR_TEAM.md) |
| DevOps | [DEPLOY_EASY.md](DEPLOY_EASY.md) |
| HR | [HR_PORTAL_GUIDE.md](HR_PORTAL_GUIDE.md) |
| Applicant | [APPLICANT_GUIDE.md](APPLICANT_GUIDE.md) |
| API Developer | [API_REFERENCE.md](API_REFERENCE.md) |
| Something's Wrong | [TROUBLESHOOTING.md](TROUBLESHOOTING.md) |

---

**Ready? Pick your role above and open that document.** 🚀

---

Last Updated: December 23, 2025  
Repository: https://github.com/Adiuk24/tapmad_career_portal
