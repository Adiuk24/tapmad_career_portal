# 🛠️ Local Setup For Team — Copy-Paste Commands

**For:** Developers & anyone testing locally  
**Time:** 10-15 minutes  
**Updated:** December 23, 2025

---

## 📖 Table of Contents

1. [Before You Start](#before-you-start)
2. [Step 1: Clone Repository](#step-1-clone-repository)
3. [Step 2: Database Setup](#step-2-database-setup)
4. [Step 3: Backend Setup](#step-3-backend-setup)
5. [Step 4: Frontend Setup](#step-4-frontend-setup)
6. [Step 5: Start Everything](#step-5-start-everything)
7. [Step 6: Test It](#step-6-test-it)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Before You Start

### Check Your Computer Has These

```bash
# Check Node.js (should be 18+)
node --version

# Check npm (should be 9+)
npm --version

# Check PostgreSQL (should be 12+)
psql --version
```

**Don't have them?** See [Troubleshooting → Missing Software](#missing-software)

### Also Check Git

```bash
git --version
```

---

## 📥 Step 1: Clone Repository

**This downloads the code to your computer**

```bash
# Go to where you want the project
cd ~/Projects  # or wherever you keep code

# Clone the repo
git clone https://github.com/Adiuk24/tapmad_career_portal.git

# Go into the project
cd tapmad_career_portal

# Verify it worked
ls -la
```

**You should see:**
```
backend/
frontend/
docker-compose.yml
README.md
... other files
```

---

## 🗄️ Step 2: Database Setup

### Start PostgreSQL

**On macOS (if installed via Homebrew):**
```bash
brew services start postgresql
```

**On Ubuntu/Linux:**
```bash
sudo systemctl start postgresql
```

**Check if running:**
```bash
psql --version
```

### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database (type this in psql prompt)
CREATE DATABASE tapmad_career;

# Verify it created (type in psql prompt)
\l

# You should see: tapmad_career | postgres | UTF8 |

# Exit psql
\q
```

### Verify Connection String

```bash
# Test connection
psql -U postgres -d tapmad_career -h localhost

# If successful, you see:
# psql (14.5 or similar)
# tapmad_career=>

# Exit
\q
```

---

## 🔧 Step 3: Backend Setup

### Navigate to Backend

```bash
cd backend
```

### Create .env File

```bash
# Create file
touch .env

# Edit it (opens in your default editor)
nano .env
# or
code .env
```

**Copy this into .env:**
```
# Database
DATABASE_URL="postgresql://postgres@localhost:5432/tapmad_career?schema=public"

# JWT & Auth
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-12345"
REFRESH_TOKEN_SECRET="your-super-secret-refresh-token-key-12345"

# API
API_URL="http://localhost:8000"
FRONTEND_URL="http://localhost:3000"

# Email (optional for now)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM=""

# Other
PORT=8000
NODE_ENV="development"
```

**Save file** (Ctrl+S or Cmd+S)

### Install Dependencies

```bash
# This might take 2-3 minutes
npm install --ignore-scripts
```

**Why `--ignore-scripts`?** Prisma client generation happens next.

### Generate Prisma Client

```bash
# Generate database client
npx prisma generate

# You should see:
# ✓ Generated Prisma Client (v5.7.1) in 2.3s
```

### Run Database Migrations

```bash
# Create tables in database
npx prisma migrate dev --name init

# You'll see:
# Running migrate `./prisma/migrations/**/migration.sql`
# Applying migration `*timestamp*_init`
# Database has been successfully migrated

# ✅ Database is ready!
```

### Test Backend API

```bash
# Start backend development server
npm run dev

# You should see:
# Server running at http://localhost:8000
# Database connected ✓
```

**Keep this running in terminal!** (Don't close it)

### Quick API Test (New Terminal)

```bash
# In a NEW terminal tab, test if backend is working
curl http://localhost:8000/health

# You should see:
# {"status":"ok","message":"Career Portal Backend is running"}
```

**✅ Backend is working!**

---

## 🎨 Step 4: Frontend Setup

### Open New Terminal Tab

**Don't close the backend terminal!**

**Click + to add new terminal tab** (or Cmd+T)

### Navigate to Frontend

```bash
# Go to project root first
cd ~/Projects/tapmad_career_portal  # or wherever you cloned it

# Go to frontend
cd frontend
```

### Create .env.local File

```bash
# Create file
touch .env.local

# Edit it
nano .env.local
# or
code .env.local
```

**Copy this into .env.local:**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Save file**

### Install Dependencies

```bash
# Install packages (takes 1-2 minutes)
npm install
```

### Start Frontend

```bash
# Start frontend development server
npm run dev

# You should see:
# ▲ Next.js 16.1.0
# - ready started server on 0.0.0.0:3000
# - event compiled client and server successfully
```

**Keep this running too!**

---

## 🚀 Step 5: Start Everything

### You Now Have Two Terminals Running

**Terminal 1 (Backend):**
```
✅ http://localhost:8000  ← API running
```

**Terminal 2 (Frontend):**
```
✅ http://localhost:3000  ← Website running
```

**That's it!** You now have the full app running locally.

---

## ✅ Step 6: Test It

### Open Your Browser

Go to: **http://localhost:3000**

You should see the **Career Portal homepage**

### Create a Test HR Account

1. Click **"Register"** button
2. Fill in:
   - Name: `Test HR`
   - Email: `hr@test.com`
   - Password: `Test@1234`
3. **Role:** Choose "I'm Hiring (HR)"
4. Click **"Register"**

**✅ You're in the HR Dashboard!**

### Create a Test Job

1. Click **"+ New Job"** button
2. Fill in:
   - **Title:** "Test Senior Engineer"
   - **Company:** "Test Company"
   - **Category:** Engineering
   - **Experience:** Mid/Senior
   - **Min Salary:** 100000
   - **Max Salary:** 150000
   - **Location:** "Remote"
   - **Type:** Full-time
   - **Mode:** Remote
   - **Description:** "Test job posting"
   - **Skills:** "JavaScript, React"

3. Click **"Publish Job"**

**✅ Job posted!**

### Create a Test Applicant Account

1. In browser, click your profile (top right)
2. Click **"Logout"**
3. Click **"Register"** again
4. Fill in:
   - Name: `Test Applicant`
   - Email: `applicant@test.com`
   - Password: `Test@1234`
5. **Role:** Choose "I'm Job Hunting (Applicant)"
6. Click **"Register"**

**✅ You're in the Job Board!**

### Apply to Test Job

1. You should see the job you just posted
2. Click **"View Details"** or job title
3. Click **"Apply"** button
4. Fill in form (or just leave defaults)
5. Click **"Submit Application"**

**✅ Application submitted!**

### Verify Application in HR Dashboard

1. Logout (profile → Logout)
2. Login as HR (`hr@test.com` / `Test@1234`)
3. Click **"Applications"** menu
4. You should see the applicant's application!

**✅ Complete flow works!**

---

## 🎯 Next Steps After Setup

### If You're a Developer

1. ✅ You have local setup working
2. **Open** `backend/src/app.ts` to see API structure
3. **Read** [API_REFERENCE.md](API_REFERENCE.md) to understand endpoints
4. Start building features!

**Useful commands:**
```bash
# Backend
cd backend
npm run dev      # Run in dev mode
npm run build    # Build for production
npm test         # Run tests (if available)

# Frontend  
cd frontend
npm run dev      # Run in dev mode
npm run build    # Build for production
npm run lint     # Check code style
```

### If You're Testing

1. ✅ You have complete system working
2. Test user flows:
   - Register as HR → Post job
   - Register as Applicant → Browse & apply
   - Check status updates
   - Logout/Login works

3. Report any bugs in [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 🆘 Troubleshooting

### Problem: `npm install` takes forever

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Problem: PostgreSQL not starting

**macOS:**
```bash
# Check status
brew services list

# Try starting
brew services start postgresql

# If not installed
brew install postgresql
```

**Ubuntu:**
```bash
sudo systemctl start postgresql
sudo systemctl status postgresql
```

### Problem: Can't connect to database

**Check connection string:**
```bash
# In backend/.env, make sure DATABASE_URL looks like:
DATABASE_URL="postgresql://postgres@localhost:5432/tapmad_career?schema=public"
```

**Test manually:**
```bash
psql -U postgres -d tapmad_career -h localhost -c "SELECT 1"

# Should show:
# ?column?
# ----------
#        1
# (1 row)
```

### Problem: `npx prisma generate` fails

**Solution:**
```bash
# Make sure DATABASE_URL is set
cat backend/.env | grep DATABASE_URL

# If it shows the connection string, try:
cd backend
npx prisma db push

# Then try generate again
npx prisma generate
```

### Problem: Backend won't start (`npm run dev`)

**Error:** "Cannot find module '@prisma/client'"

**Solution:**
```bash
cd backend
rm -rf node_modules
npm install --ignore-scripts
npx prisma generate
npm run dev
```

### Problem: Frontend won't load (http://localhost:3000 is blank)

**Check:**
1. Is frontend running? Check terminal for errors
2. Is backend running? (`http://localhost:8000/health` should work)
3. Try hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

**If still stuck:**
```bash
# Kill frontend
# (In frontend terminal, press Ctrl+C)

# Reinstall
cd frontend
rm -rf node_modules .next
npm install
npm run dev
```

### Problem: Login fails / Can't authenticate

**Reason:** Usually wrong email/password

**Solution:**
```bash
# Create new account
# Use different email each time for testing
```

### Missing Software

**Node.js not installed:**
```bash
# macOS
brew install node

# Ubuntu
sudo apt-get install nodejs npm

# Or download from https://nodejs.org
```

**PostgreSQL not installed:**
```bash
# macOS
brew install postgresql

# Ubuntu
sudo apt-get install postgresql

# Or download from https://www.postgresql.org/download
```

**Git not installed:**
```bash
# macOS
brew install git

# Ubuntu
sudo apt-get install git

# Or download from https://git-scm.com
```

---

## 📋 Checklist: You're Done When...

- [ ] Node.js and npm installed
- [ ] PostgreSQL installed and running
- [ ] Repository cloned
- [ ] Database created (`tapmad_career`)
- [ ] Backend `.env` file created with `DATABASE_URL`
- [ ] Backend dependencies installed (`npm install --ignore-scripts`)
- [ ] Prisma client generated (`npx prisma generate`)
- [ ] Database migrations run (`npx prisma migrate dev --name init`)
- [ ] Backend running (`npm run dev` shows "Server running")
- [ ] Frontend `.env.local` file created
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Frontend running (`npm run dev` shows "ready")
- [ ] Can access http://localhost:3000 (shows website)
- [ ] Can create HR account
- [ ] Can post a job
- [ ] Can create Applicant account
- [ ] Can apply to job
- [ ] Can see application in HR dashboard

**All checked? 🎉 You're ready to start developing or deploy!**

---

## 🚀 Ready to Deploy?

Once local testing is done, follow: [DEPLOY_EASY.md](DEPLOY_EASY.md)

---

## 🆘 Still Stuck?

Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or ask in GitHub Issues:
https://github.com/Adiuk24/tapmad_career_portal/issues

---

**Last Updated:** December 23, 2025  
**Time to Complete:** 10-15 minutes  
**Difficulty:** Easy

**Ready? Start with Step 1: [Clone Repository](#step-1-clone-repository)** 👆
