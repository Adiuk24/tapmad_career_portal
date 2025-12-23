# 🚀 Simple Setup Guide — Tapmad Career Portal

**Goal:** Get the app running locally in 10 minutes, then deploy to your server.

---

## Step 1: Start PostgreSQL (1 min)

```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# If not running, start it:
brew services start postgresql

# Verify connection:
psql -U postgres -d postgres -c "SELECT 1"
```

**Expected output:** `1` (shows connection works)

---

## Step 2: Create Database (1 min)

```bash
# Create the database
psql -U postgres -c "CREATE DATABASE tapmad_career;"

# Verify it was created:
psql -U postgres -l | grep tapmad_career
```

**Expected output:** Database `tapmad_career` should be listed.

---

## Step 3: Install Dependencies (3 min)

```bash
cd "Career portal for tapmad"

# Install all deps
npm run install:all

# Go to backend and skip prisma generation on install (we'll do it manually)
cd backend
npm install --ignore-scripts
```

---

## Step 4: Generate Prisma Client (2 min)

```bash
cd backend

# Run this ONCE to generate the Prisma client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init
```

**If you get errors:**
- Make sure PostgreSQL is running: `psql -U postgres -c "SELECT 1"`
- Make sure `.env` has correct `DATABASE_URL`: `cat .env | grep DATABASE_URL`
- Check if `tapmad_career` database exists: `psql -U postgres -l`

---

## Step 5: Start Backend (1 min)

```bash
cd backend
npm run dev

# You should see:
# 🚀 Server running on http://localhost:8000
# 📊 Environment: development

# In another terminal, test it:
curl http://localhost:8000/health
# Expected response: {"status":"ok","timestamp":"..."}
```

---

## Step 6: Start Frontend (1 min)

```bash
# In a new terminal window/tab:
cd "Career portal for tapmad/frontend"
npm run dev

# You should see:
# ▲ Next.js 16.1.0
# - Local: http://localhost:3000
```

Open **http://localhost:3000** in your browser. You should see the landing page.

---

## Step 7: Test the App (2 min)

1. **Register as HR:**
   - Click "Register"
   - Email: `hr@tapmad.com` | Password: `Password123`
   - Role: HR
   - Click "Register"

2. **Create a Job:**
   - Go to HR Dashboard
   - Click "Post New Job"
   - Fill in job details (Title, Department, etc.)
   - Click "Publish"

3. **Register as Applicant:**
   - Logout
   - Register again
   - Email: `applicant@tapmad.com` | Password: `Password123`
   - Role: Applicant

4. **Apply to Job:**
   - Browse jobs on homepage
   - Click a job
   - Click "Apply"
   - Submit application

5. **View Applications as HR:**
   - Logout and login as HR
   - Go to Dashboard → Applications
   - You should see the application

---

## ✅ If Everything Works

Congratulations! Your app is running locally. Now you can:
- Share the link with your team
- Test all features
- Deploy to your server (see `DEPLOY_TO_SERVER.md`)

---

## ❌ If Something Fails

### Backend won't start

```bash
# Check PostgreSQL is running
brew services list | grep postgresql

# Check database exists
psql -U postgres -l | grep tapmad_career

# Check .env file is correct
cat backend/.env | grep DATABASE_URL

# Try to connect manually
psql -U postgres -d tapmad_career -c "SELECT 1"
```

### Prisma generate fails

```bash
# Make sure you're in the backend directory
cd backend

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --ignore-scripts

# Try again
npx prisma generate
```

### Frontend won't load

```bash
# Check if port 3000 is in use
lsof -i :3000

# If in use, kill it:
kill -9 <PID>

# Try again
npm run dev:frontend
```

### Can't connect to database

```bash
# Make sure PostgreSQL is running
brew services start postgresql

# Check PostgreSQL status
brew services list | grep postgresql

# Verify you can connect
psql -U postgres -c "SELECT 1"

# If connection fails, try resetting PostgreSQL
brew services stop postgresql
brew services start postgresql
```

---

## Next: Deploy to Your Server

Once local testing is done, see `DEPLOY_TO_SERVER.md` for step-by-step deployment instructions.

---

**Questions?** Check:
- `README.md` — Overview
- `CONFIGURATION.md` — Detailed env setup
- `FULL_REVIEW_REPORT.md` — Architecture and design decisions
