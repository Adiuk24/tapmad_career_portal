# Quick Test Guide

## ✅ Frontend is Running!

**Open in your browser:** http://localhost:3000

## 🎯 What to Test Right Now

### 1. Landing Page (No Login Required)
- ✅ Visit http://localhost:3000
- ✅ See the Tapmad Career Portal homepage
- ✅ Check the design and branding
- ✅ Click "Browse Jobs" button
- ✅ Click "Sign In" button

### 2. Job Browsing (Public)
- ✅ Go to http://localhost:3000/jobs
- ✅ See job listings (may be empty if no jobs posted yet)
- ✅ Test search and filters
- ✅ Click on a job to see details

### 3. Registration & Login
- ✅ Go to http://localhost:3000/register
- ✅ Create an account:
  - Full Name: Test User
  - Email: test@example.com
  - Password: test123456
  - Role: Job Applicant
- ✅ After registration, login at http://localhost:3000/login

### 4. Create HR Account
- ✅ Register another account with role "HR Professional"
- ✅ Login as HR user
- ✅ You should see the HR Dashboard

## ⚠️ If Backend is Not Running

The backend needs a database connection. To set it up:

```bash
# 1. Make sure PostgreSQL is running
# 2. Update DATABASE_URL in backend/.env
# 3. Run migrations:
cd backend
npx prisma generate
npx prisma migrate dev

# 4. Start backend separately:
npm run dev:backend
```

## 🎨 What You Can Test Without Backend

Even without the backend fully running, you can:
- ✅ View the landing page
- ✅ See the UI design
- ✅ Navigate between pages
- ✅ Test form layouts
- ✅ Check responsive design

## 🚀 Full Testing (With Backend)

Once backend is running:
1. Create jobs as HR user
2. Apply to jobs as applicant
3. Manage applications as HR
4. View analytics
5. Test all features

## 📱 Test on Mobile

Open http://localhost:3000 on your phone (same network) or use browser dev tools to test mobile view.

---

**Note:** The frontend is running and ready to test! The backend may need database setup to be fully functional.

