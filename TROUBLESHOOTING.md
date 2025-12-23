# 🆘 Troubleshooting Guide — Solutions to Common Problems

**For:** Everyone (Developers, DevOps, HR, Applicants)  
**Updated:** December 23, 2025

---

## 📖 Table of Contents

1. [General Issues](#general-issues)
2. [Installation & Setup](#installation--setup)
3. [Database Issues](#database-issues)
4. [Authentication Issues](#authentication-issues)
5. [Job Posting Issues](#job-posting-issues)
6. [Application Issues](#application-issues)
7. [Deployment Issues](#deployment-issues)
8. [Performance Issues](#performance-issues)
9. [Contact & Support](#contact--support)

---

## 🌐 General Issues

### Problem: Website won't load (blank page)

**Possible Causes:**
- Frontend not running
- Backend not running
- Network connection issue
- Wrong URL

**Solutions:**

**Step 1:** Check if frontend is running
```bash
# In terminal, check if you see:
# ▲ Next.js ... ready started server on 0.0.0.0:3000
# OR
# ✓ compiled client and server successfully
```

**If not running:**
```bash
cd frontend
npm run dev
```

**Step 2:** Check if backend is running
```bash
# In another terminal, test:
curl http://localhost:8000/health

# Should return:
# {"status":"ok","message":"Career Portal Backend is running"}
```

**If not running:**
```bash
cd backend
npm run dev
```

**Step 3:** Hard refresh browser
```
Mac: Cmd + Shift + R
Windows: Ctrl + Shift + R
```

**Step 4:** Check network connection
```bash
# Test internet
ping google.com
```

**Step 5:** Try different browser
- Chrome
- Safari
- Firefox

### Problem: "Connection Refused" error

**Meaning:** Server isn't responding

**Solutions:**

**Check backend is running:**
```bash
ps aux | grep node
# Should see backend process

# If not, start it:
cd backend && npm run dev
```

**Check port 8000 is available:**
```bash
# Mac/Linux
lsof -i :8000

# If something is using it:
kill -9 [PID]
```

**Check firewall:**
```bash
# Mac
sudo defaults read /Library/Preferences/com.apple.alf
# Should see enabled: 1

# Linux
sudo ufw status
```

### Problem: "Cannot GET /" error

**Meaning:** Frontend isn't serving

**Solutions:**

**Check frontend is running:**
```bash
# Look for Next.js output in terminal
# Should see: "ready started server on 0.0.0.0:3000"

# If not, start it:
cd frontend && npm run dev
```

**Clear browser cache:**
```bash
Ctrl+Shift+Delete (Windows)
Cmd+Shift+Delete (Mac)
```

**Try different port:**
```bash
# Frontend using different port?
NEXT_PORT=3001 npm run dev
```

---

## 🔧 Installation & Setup

### Problem: `npm install` fails

**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Try again with legacy peer deps
npm install --legacy-peer-deps

# If still fails, try:
npm install --no-optional
```

### Problem: `npm install` takes forever

**Reasons:**
- Slow internet
- Network timeout
- Cache corruption

**Solutions:**
```bash
# Increase timeout
npm config set fetch-timeout 120000

# Or skip unnecessary packages
npm install --no-save --no-audit

# Or use yarn (faster)
yarn install
```

### Problem: Node modules corrupted

**Error:** `Cannot find module 'xxx'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Problem: TypeScript errors

**Error:** `TS2307: Cannot find module`

**Solution:**
```bash
# Rebuild TypeScript
npx tsc --version

# If needed:
npm install -g typescript

# Rebuild project
npm run build
```

### Problem: Port already in use

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution (Mac/Linux):**
```bash
# Find what's using the port
lsof -i :3000

# Kill the process
kill -9 [PID]

# Or use different port
NEXT_PORT=3001 npm run dev
```

**Solution (Windows):**
```bash
# Find process
netstat -ano | findstr :3000

# Kill it
taskkill /PID [PID] /F

# Or use different port
set NEXT_PORT=3001 && npm run dev
```

---

## 🗄️ Database Issues

### Problem: "Cannot connect to database"

**Error:** `Can't reach database server`

**Solutions:**

**Step 1:** Check PostgreSQL is running
```bash
# Mac
brew services list | grep postgres

# Should show: started

# If not:
brew services start postgresql
```

**Step 2:** Verify database exists
```bash
# Connect to PostgreSQL
psql -U postgres -c "SELECT datname FROM pg_database;"

# Should show: tapmad_career

# If not, create it:
createdb tapmad_career
```

**Step 3:** Check connection string
```bash
# In backend/.env, should be:
DATABASE_URL="postgresql://postgres@localhost:5432/tapmad_career?schema=public"

# Or with auth:
DATABASE_URL="postgresql://user:password@localhost:5432/tapmad_career?schema=public"
```

**Step 4:** Test connection manually
```bash
psql -U postgres -d tapmad_career -h localhost

# Should connect. Type: \q to exit
```

### Problem: "Prisma client not found"

**Error:** `@prisma/client did not initialize yet`

**Solution:**
```bash
cd backend

# Generate client
npx prisma generate

# You should see:
# ✓ Generated Prisma Client (v5.7.1)

# If that fails, check DATABASE_URL
cat .env | grep DATABASE_URL

# Should output your connection string
```

### Problem: "Migration failed"

**Error:** `Migration cannot be applied cleanly`

**Reasons:**
- Database schema doesn't match
- Missing migrations
- Corruption

**Solutions:**

**Option 1: Reset database (use carefully!)**
```bash
# WARNING: This deletes ALL DATA
npx prisma migrate reset

# Confirm by typing: y

# This will:
# 1. Drop existing database
# 2. Create new database
# 3. Apply all migrations
# 4. Seed data (if seed script exists)
```

**Option 2: Force migration**
```bash
# Deploy migrations (no interactive mode)
npx prisma migrate deploy

# If fails, check database:
npx prisma studio

# Check the issue in UI
```

**Option 3: Create new migration**
```bash
# Create fresh migration
npx prisma migrate dev --name init
```

### Problem: Database has no tables

**Meaning:** Schema is empty but should have tables

**Solution:**
```bash
# Check if migrations ran
npx prisma migrate status

# If not applied, apply them:
npx prisma migrate deploy

# Verify tables exist:
psql -U postgres -d tapmad_career -c "\dt"

# Should show: applications, jobs, users, etc.
```

### Problem: "Unique constraint violation"

**Error:** `Unique constraint failed on the fields: (email)`

**Meaning:** Someone already registered with this email

**Solution:**
- Use a different email
- Reset database (if development): `npx prisma migrate reset`

---

## 🔐 Authentication Issues

### Problem: "Invalid email or password"

**When:** Login fails

**Reasons:**
- Typo in email
- Wrong password
- Account doesn't exist

**Solutions:**

**Step 1:** Double-check credentials
- Email spelled correctly?
- Caps lock off?
- Password correct?

**Step 2:** Try forgot password
```
1. Click "Forgot Password"
2. Enter email
3. Check email for reset link
4. Create new password
5. Login
```

**Step 3:** Create new account
```
1. Click "Register"
2. Use different email (if first email taken)
3. Create account
```

### Problem: "Token expired"

**When:** You get logged out

**Why:** JWT tokens expire after time (usually 1 hour)

**Solution:**
```
Automatic:
- App refreshes token in background
- Usually you don't notice

Manual:
- Login again
- Or use refresh token endpoint
```

### Problem: "Unauthorized" on API call

**Error:** `401 Unauthorized`

**Reasons:**
- No token provided
- Token expired
- Token invalid
- Wrong role

**Solutions:**

**Check token is being sent:**
```bash
# Frontend: Check browser DevTools
# Go to Network tab → Click API request
# Headers → Check "Authorization: Bearer TOKEN"

# If missing, check:
# - Logged in?
# - lib/api.ts has correct token handling
```

**Check token format:**
```bash
# Should be:
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

# Not:
Authorization: eyJhbGciOiJIUzI1NiIs...
Authorization: "Bearer eyJhbGciOiJIUzI1NiIs..."
```

### Problem: "Access Denied" or "Forbidden"

**Error:** `403 Forbidden`

**Meaning:** You don't have permission

**Examples:**
- Applicant trying to post job (HR only)
- Applicant trying to change someone else's application

**Solution:**
- Check your role (Profile → Settings)
- Ask admin to change role if needed
- Or use different account with right role

### Problem: Can't register account

**Error:** `Email already exists` or `Validation failed`

**Solutions:**

**If email exists:**
```
1. Use different email
2. Or try login if you already have account
3. Or use "Forgot Password" if you forgot
```

**If validation error:**
```
Check all fields:
- Name: Not empty ✓
- Email: Valid format (has @) ✓
- Password: 8+ chars, uppercase, lowercase, number ✓
- Role: Selected ✓
- Terms: Checked ✓
```

---

## 📝 Job Posting Issues

### Problem: "Can't post a job"

**Reasons:**
- Not an HR user
- Missing required fields
- Permission error

**Solutions:**

**Check you're HR:**
```
1. Go to Profile
2. Check Role: Should be "HR" not "Applicant"
3. If wrong, contact admin
```

**Check all required fields:**
```
Red asterisk (*) = Required field

Required:
☑ Title
☑ Company
☑ Category
☑ Experience Level
☑ Salary (min & max)
☑ Location
☑ Job Type
☑ Work Mode
☑ Description
☑ Skills
```

**Try form again:**
```
1. Refresh page
2. Try posting smaller description first
3. Then add details
```

### Problem: Job doesn't appear

**When:** Posted but can't find it

**Solutions:**

**Step 1:** Check it actually posted
```
Go to HR Dashboard → Jobs
Should see your new job in the list
If not, check for error message
```

**Step 2:** Search for it
```
Go to job board (public view)
Search by: Title, Company, or Skills
If it shows, great!
```

**Step 3:** Check job expiration
```
Go to your job
Check "Expires at" date
If past, job is no longer visible
Extend deadline or repost
```

### Problem: "Can't edit job"

**Reasons:**
- Job already expired
- Not enough permissions
- Someone else posted it

**Solutions:**
```
1. Only HR who posted can edit
2. Ask original poster to edit
3. Delete and repost
```

---

## 💼 Application Issues

### Problem: "Can't apply to job"

**Reasons:**
- Already applied to this job
- Job expired
- Not logged in
- Not an applicant

**Solutions:**

**Check you're logged in:**
```
See name in top right? If not, login first
```

**Check you're an applicant:**
```
Profile → Role should be "Applicant"
Not "HR" or other role
```

**Check job hasn't expired:**
```
Go to job details
Check "Expires at" date
If past date, can't apply
Look for other jobs
```

**Check you haven't applied:**
```
Go to My Applications
Search for this job
If listed, you already applied
Can't apply twice
```

**Try on different job:**
```
If one job fails, try another
Might be issue with that specific job
```

### Problem: Application won't submit

**Error:** "Submission failed" or form still enabled

**Solutions:**

**Check all required fields:**
```
Some fields might be required even if not obvious
Review before submitting
```

**Check file size (if uploading):**
```
Resume file too large? (Max 5MB usually)
Use PDF or DOC format
```

**Check internet connection:**
```
Application upload needs stable connection
Try again
Or try without file first
```

**Try different browser:**
```
Chrome → Firefox → Safari
Sometimes browser specific issues
```

### Problem: Can't see applications

**For Applicants:**
```
1. Go to Profile
2. Click "My Applications"
3. Should see all jobs you applied to
4. If none, you haven't applied yet
```

**For HR:**
```
1. Click "Applications" menu
2. See all applications to your jobs
3. Filter by job if needed
4. If none, no one applied yet
```

### Problem: Status not updating

**When:** Application status doesn't change

**Solutions:**

**For HR changing status:**
```
1. Go to Applications
2. Click application
3. Click Status dropdown
4. Select new status
5. Click Save
6. Refresh page to confirm
```

**For Applicants:**
```
1. Wait 30 seconds
2. Refresh page (F5)
3. Logout and login
4. Status should update in real-time
5. Check email for notifications
```

---

## 🚀 Deployment Issues

### Problem: Docker won't start

**Error:** `Cannot connect to Docker daemon`

**Solutions:**

**Check Docker is installed:**
```bash
docker --version

# If not installed
brew install docker-desktop  # Mac
# Or download from docker.com
```

**Check Docker is running:**
```bash
# Mac: Should see Docker menu icon in top right
# Linux: 
sudo systemctl start docker
```

**Try again:**
```bash
docker-compose up -d
```

### Problem: Docker build fails

**Error:** `Error building image`

**Solutions:**

**Check Dockerfile exists:**
```bash
ls -la Dockerfile.backend
ls -la Dockerfile.frontend

# If missing, check:
# - Correct filenames
# - In project root
```

**Check Docker daemon:**
```bash
docker ps

# If error, Docker not running
docker-compose up -d
```

**Check disk space:**
```bash
df -h

# Should have >5GB free for Docker images
```

**Try rebuilding:**
```bash
docker-compose build --no-cache
```

### Problem: Container exits immediately

**Error:** Containers start then stop

**Solutions:**

**Check logs:**
```bash
docker-compose logs backend
docker-compose logs frontend

# Shows what went wrong
```

**Common issues:**
```
1. Environment variable missing
   - Check .env file
   - Check docker-compose.yml

2. Port already in use
   - Check: lsof -i :8000 (or port number)
   - Kill: kill -9 [PID]

3. Database connection failed
   - Check DATABASE_URL in .env
   - Check PostgreSQL running
   - Check credentials
```

### Problem: Can't reach deployed site

**When:** Site doesn't respond at domain

**Solutions:**

**Check services running:**
```bash
# SSH to server
docker-compose ps

# All should show: Up ...

# If any down, restart:
docker-compose restart
```

**Check network:**
```bash
# On server:
curl http://localhost:3000  # Frontend
curl http://localhost:8000  # Backend
```

**Check Nginx (if using):**
```bash
sudo systemctl status nginx

# Should show: active (running)

# If not:
sudo systemctl start nginx
```

**Check domain DNS:**
```bash
# From laptop:
nslookup yourdomain.com

# Should show: server IP
```

**Check firewall:**
```bash
# On server:
sudo ufw status

# Should allow 80, 443:
sudo ufw allow 80
sudo ufw allow 443
```

---

## ⚡ Performance Issues

### Problem: Website loads slowly

**Reasons:**
- Backend overwhelmed
- Database slow
- Network issue
- Large files

**Solutions:**

**Check backend performance:**
```bash
# On server:
top  # Shows CPU/RAM usage

# Should be:
# CPU: <50%
# RAM: <75%

# If high, may need more resources
```

**Check database:**
```bash
# Check connections:
psql -U postgres -c "SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;"

# Too many connections? Restart database:
sudo systemctl restart postgresql
```

**Optimize queries:**
```bash
# In Prisma, avoid N+1 queries
# Use include/select to fetch relations
```

**Enable caching:**
```bash
# In Nginx config:
location ~ \.(js|css|png)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Problem: High CPU usage

**When:** Server fans spinning, site slow

**Solutions:**

**Find the culprit:**
```bash
top  # Press Shift+P to sort by CPU

# Look for:
# - node processes using lots of CPU
# - postgres using lots of CPU
# - others
```

**If Node.js:**
```bash
# Restart backend:
docker-compose restart backend
# OR
sudo systemctl restart career-backend
```

**If PostgreSQL:**
```bash
# Check long-running queries:
psql -U postgres -c "SELECT pid, usename, query, query_start FROM pg_stat_activity WHERE query != 'IDLE';"

# Kill slow query (use with care):
SELECT pg_terminate_backend(pid);
```

### Problem: Out of disk space

**Error:** `No space left on device`

**Solution:**

**Check usage:**
```bash
df -h

# Should be <80% used
```

**Free space:**
```bash
# Docker cleanup:
docker system prune -a

# Clear old logs:
sudo truncate -s 0 /var/log/nginx/access.log

# Clear package cache:
npm cache clean --force
```

---

## 📞 Contact & Support

### Getting Help

**Before contacting support, try:**

1. ✅ Check this guide
2. ✅ Check error message closely
3. ✅ Check logs:
   ```bash
   # Frontend logs in browser console (F12)
   # Backend logs in terminal
   # Docker logs: docker-compose logs -f
   ```
4. ✅ Try restarting services
5. ✅ Try different browser

### Report Issues

**On GitHub:**
```
Go to: https://github.com/Adiuk24/tapmad_career_portal/issues
Click: New Issue
Include:
- Error message
- Steps to reproduce
- OS/Browser used
- Screenshots if helpful
```

### Required Information When Getting Help

```
When reporting issue, include:

1. What were you doing?
2. What did you expect?
3. What happened instead?
4. Error message (exact text)
5. How to reproduce:
   - Step 1: ...
   - Step 2: ...
   - Step 3: ...
6. Your environment:
   - OS: Windows/Mac/Linux
   - Browser: Chrome/Safari/Firefox
   - Node version: (node --version)
   - npm version: (npm --version)
```

---

## 🎯 Quick Checklist

### Common Checklist

- [ ] Is backend running? (`curl http://localhost:8000/health`)
- [ ] Is frontend running? (Check terminal for Next.js)
- [ ] Is PostgreSQL running? (`psql -U postgres`)
- [ ] Is database created? (See tapmad_career in psql)
- [ ] Are migrations applied? (npx prisma migrate status)
- [ ] Do .env files exist? (backend/.env, frontend/.env.local)
- [ ] Can you login? (Try register then login)

### If Nothing Works

```
1. Stop everything (Ctrl+C in terminals)
2. Delete node_modules:
   rm -rf node_modules package-lock.json
3. Restart PostgreSQL:
   brew services stop postgresql
   brew services start postgresql
4. Recreate database:
   dropdb tapmad_career
   createdb tapmad_career
5. Reinstall:
   npm install
   npm run dev (in each folder)
6. Try again
```

---

**Last Updated:** December 23, 2025  
**Stuck?** GitHub Issues: https://github.com/Adiuk24/tapmad_career_portal/issues  
**Good luck! 🍀**
