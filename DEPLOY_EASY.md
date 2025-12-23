# 🚀 Deploy Easy — Simple Server Deployment Guide

**For:** DevOps, System Admins, Anyone Deploying  
**Time:** 30 minutes (Docker) or 2 hours (Manual)  
**Updated:** December 23, 2025

---

## 📖 Table of Contents

1. [Before You Start](#before-you-start)
2. [Option 1: Docker (Easiest)](#option-1-docker-easiest--recommended)
3. [Option 2: Manual Setup](#option-2-manual-setup)
4. [Post-Deployment](#post-deployment)
5. [Troubleshooting](#troubleshooting)

---

## ✅ Before You Start

### What You Need

**A Linux server with:**
- Ubuntu 20.04 or higher (or similar Linux distro)
- 2 GB RAM minimum (4 GB recommended)
- 20 GB disk space minimum
- SSH access to server
- Domain name (optional, but recommended)

**On your laptop:**
- SSH client (comes with macOS, Linux)
- Git installed

### Get Your Server Details

```
Server IP: _______________
Username: _______________
SSH Key: _______________
Domain: _______________ (optional)
```

---

## 🐳 Option 1: Docker (EASIEST & RECOMMENDED)

**Time:** 30 minutes  
**Skills:** Basic command line

### Step 1: SSH into Your Server

```bash
# From your laptop
ssh username@your-server-ip

# Or if using SSH key
ssh -i /path/to/key username@your-server-ip

# You should see a terminal prompt on the server
```

### Step 2: Install Docker & Docker Compose

```bash
# Update package manager
sudo apt-get update

# Install Docker (takes 2-3 minutes)
sudo apt-get install -y docker.io docker-compose

# Verify installation
docker --version
docker-compose --version

# Enable Docker to start on boot
sudo systemctl enable docker

# Add your user to docker group (so no sudo needed)
sudo usermod -aG docker $USER

# Log out and back in for group to take effect
exit
# Then SSH back in
ssh username@your-server-ip
```

### Step 3: Clone Repository

```bash
# Clone the project
git clone https://github.com/Adiuk24/tapmad_career_portal.git

# Go into project
cd tapmad_career_portal

# Verify files exist
ls -la
```

**You should see:**
```
docker-compose.yml
backend/
frontend/
... other files
```

### Step 4: Create Production .env Files

#### Backend .env

```bash
# Create backend env file
sudo nano backend/.env
```

**Copy this (change values!):**
```
# Database
DATABASE_URL="postgresql://postgres:your-secure-password@postgres:5432/tapmad_career?schema=public"

# JWT & Auth
JWT_SECRET="generate-a-random-string-here-min-32-chars"
REFRESH_TOKEN_SECRET="generate-another-random-string-here-32-chars"

# API
API_URL="https://api.yourdomain.com"
FRONTEND_URL="https://yourdomain.com"

# Email (optional)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM=""

# Other
PORT=8000
NODE_ENV="production"
```

**To generate secure random secrets:**
```bash
# Run this command twice, copy output into JWT_SECRET and REFRESH_TOKEN_SECRET
openssl rand -base64 32
```

**Save file:** Press Ctrl+X, then Y, then Enter

#### Frontend .env (optional)

```bash
sudo nano frontend/.env.production
```

**Copy this:**
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

**Save file**

### Step 5: Update Docker Compose File

```bash
# Edit docker-compose.yml
sudo nano docker-compose.yml
```

**Change these lines:**

Find this section:
```yaml
environment:
  DATABASE_URL: ...
```

Make sure it has:
```yaml
environment:
  DATABASE_URL: "postgresql://postgres:your-secure-password@postgres:5432/tapmad_career?schema=public"
  POSTGRES_PASSWORD: "your-secure-password"
```

**Use same password as in backend/.env above**

**Save file**

### Step 6: Build & Start Containers

```bash
# Build images (takes 5-10 minutes first time)
docker-compose build

# Start services (runs in background)
docker-compose up -d

# Check if running
docker-compose ps

# You should see:
# STATUS: Up ... (all services)
```

### Step 7: Run Database Migrations

```bash
# Run Prisma migrations in the backend container
docker-compose exec backend npx prisma migrate deploy

# You should see:
# Running apply `*timestamp*`
# Applying migration `*timestamp*_init`
# Database has been successfully migrated to the timestamp "*timestamp*".
```

### Step 8: Check Everything is Running

```bash
# Check backend API
curl http://localhost:8000/health

# You should see:
# {"status":"ok","message":"Career Portal Backend is running"}

# Check frontend (in browser)
# Go to http://your-server-ip:3000
```

**✅ Application is running!**

### Step 9: (Optional) Set Up Nginx Reverse Proxy

**Why?** So you can use domain names instead of IP addresses

```bash
# Install Nginx
sudo apt-get install -y nginx

# Create config file
sudo nano /etc/nginx/sites-available/career-portal
```

**Copy this (change domain!):**
```nginx
server {
    listen 80;
    server_name yourdomain.com api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Save file**

```bash
# Enable config
sudo ln -s /etc/nginx/sites-available/career-portal /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Should show: ok

# Restart Nginx
sudo systemctl restart nginx

# Check if running
sudo systemctl status nginx
```

**✅ Now visit http://yourdomain.com (no port number!)**

### Step 10: (Recommended) Set Up SSL/HTTPS

```bash
# Install Let's Encrypt
sudo apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate (automatic!)
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Auto-redirect HTTP to HTTPS (choose Y)

# Test renewal
sudo certbot renew --dry-run

# SSL is now active! Visit https://yourdomain.com
```

**✅ Your site is now secure with HTTPS!**

---

## 🛠️ Option 2: Manual Setup

**Time:** 2-3 hours  
**Skills:** Advanced command line

### Step 1: SSH & Install Requirements

```bash
# SSH into server
ssh username@your-server-ip

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Install Nginx
sudo apt-get install -y nginx

# Verify
node --version
psql --version
nginx -v
```

### Step 2: Set Up Database

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user (in psql prompt)
CREATE DATABASE tapmad_career;
CREATE USER tapmad_user WITH PASSWORD 'your-secure-password';
ALTER ROLE tapmad_user WITH CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE tapmad_career TO tapmad_user;

# Exit psql
\q

# Verify connection
psql -U tapmad_user -d tapmad_career -h localhost
\q
```

### Step 3: Clone & Setup Backend

```bash
# Create directory
mkdir -p /var/www
cd /var/www

# Clone repo
git clone https://github.com/Adiuk24/tapmad_career_portal.git
cd tapmad_career_portal/backend

# Create .env
nano .env
```

**Copy this:**
```
DATABASE_URL="postgresql://tapmad_user:your-secure-password@localhost:5432/tapmad_career?schema=public"
JWT_SECRET="your-secure-jwt-secret-min-32-chars"
REFRESH_TOKEN_SECRET="your-secure-refresh-token-min-32-chars"
API_URL="https://api.yourdomain.com"
FRONTEND_URL="https://yourdomain.com"
PORT=8000
NODE_ENV="production"
```

**Save file**

```bash
# Install dependencies
npm install --ignore-scripts

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Build
npm run build

# Test run
npm start

# You should see: "Server running at..."
# Press Ctrl+C to stop
```

### Step 4: Set Up Backend as Service

```bash
# Create systemd service file
sudo nano /etc/systemd/system/career-backend.service
```

**Copy this:**
```ini
[Unit]
Description=Career Portal Backend
After=network.target postgresql.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/var/www/tapmad_career_portal/backend
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
Environment="NODE_ENV=production"

[Install]
WantedBy=multi-user.target
```

**Save file**

```bash
# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable career-backend
sudo systemctl start career-backend

# Check status
sudo systemctl status career-backend

# Check logs
sudo journalctl -u career-backend -f
```

### Step 5: Set Up Frontend

```bash
cd /var/www/tapmad_career_portal/frontend

# Create .env.production
nano .env.production
```

**Copy this:**
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

**Save file**

```bash
# Install dependencies
npm install

# Build
npm run build

# Test run (starts on port 3000)
npm start

# Press Ctrl+C to stop
```

### Step 6: Set Up Frontend as Service

```bash
sudo nano /etc/systemd/system/career-frontend.service
```

**Copy this:**
```ini
[Unit]
Description=Career Portal Frontend
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/var/www/tapmad_career_portal/frontend
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
Environment="NODE_ENV=production"

[Install]
WantedBy=multi-user.target
```

**Save file**

```bash
# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable career-frontend
sudo systemctl start career-frontend

# Check status
sudo systemctl status career-frontend
```

### Step 7: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/career-portal
```

**Copy this (change domain!):**
```nginx
upstream backend {
    server localhost:8000;
}

upstream frontend {
    server localhost:3000;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Save file**

```bash
# Enable config
sudo ln -s /etc/nginx/sites-available/career-portal /etc/nginx/sites-enabled/

# Test
sudo nginx -t

# Restart
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

### Step 8: Set Up SSL

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

**✅ Your site is live at https://yourdomain.com**

---

## 📋 Post-Deployment

### Verify Everything Works

```bash
# Check backend
curl https://api.yourdomain.com/health

# Check frontend
curl https://yourdomain.com

# Should not show errors
```

### Test Full Flow

1. Go to https://yourdomain.com
2. Register as HR
3. Post a job
4. Logout
5. Register as Applicant
6. Apply to job
7. Login as HR
8. See application

**Everything works? 🎉**

### Set Up Monitoring

```bash
# View backend logs (Docker)
docker-compose logs -f backend

# View frontend logs (Docker)
docker-compose logs -f frontend

# View Nginx logs (Manual setup)
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# View service logs (Manual setup)
sudo journalctl -u career-backend -f
sudo journalctl -u career-frontend -f
```

### Restart Services

```bash
# Docker
docker-compose restart

# Manual (systemd)
sudo systemctl restart career-backend
sudo systemctl restart career-frontend
sudo systemctl restart nginx
```

### View Running Processes

```bash
# Docker
docker-compose ps

# Manual
ps aux | grep node
ps aux | grep nginx
```

---

## 🆘 Troubleshooting

### Problem: "Connection refused" on API

**Reason:** Backend not running

**Solution (Docker):**
```bash
docker-compose logs backend
docker-compose restart backend
```

**Solution (Manual):**
```bash
sudo systemctl status career-backend
sudo systemctl restart career-backend
sudo journalctl -u career-backend -n 50
```

### Problem: Database error

**Reason:** Migration didn't run

**Solution (Docker):**
```bash
docker-compose exec backend npx prisma migrate deploy
docker-compose restart backend
```

**Solution (Manual):**
```bash
cd /var/www/tapmad_career_portal/backend
npx prisma migrate deploy
sudo systemctl restart career-backend
```

### Problem: "Cannot GET /"

**Reason:** Frontend not serving

**Solution (Docker):**
```bash
docker-compose logs frontend
docker-compose restart frontend
```

**Solution (Manual):**
```bash
sudo systemctl status career-frontend
sudo systemctl restart career-frontend
```

### Problem: SSL certificate failed

**Solution:**
```bash
# Check certificate
sudo certbot certificates

# Renew manually
sudo certbot renew

# Check renewal logs
sudo tail -f /var/log/letsencrypt/letsencrypt.log
```

### Problem: Out of disk space

```bash
# Check disk usage
df -h

# Clean old Docker images (if using Docker)
docker system prune -a

# Clean npm cache
npm cache clean --force
```

---

## 📊 Performance Tips

### Enable Caching

```bash
# In Nginx config, add to frontend block:
location ~ \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Monitor Resources

```bash
# Check CPU & RAM
top

# Check disk
df -h

# Check PostgreSQL connections
psql -U postgres -c "SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;"
```

### Optimize Database

```bash
# Run within PostgreSQL
VACUUM ANALYZE;
```

---

## 🔐 Security Checklist

- [ ] Changed all default passwords
- [ ] Generated secure JWT secrets (min 32 chars)
- [ ] Enabled SSL/HTTPS
- [ ] Set up firewall (block unused ports)
- [ ] Kept system updated (`sudo apt-get update && upgrade`)
- [ ] Disabled root SSH login
- [ ] Set up SSH key authentication
- [ ] Configured rate limiting (in Nginx)
- [ ] Enabled logs monitoring

---

## 🎯 Next Steps

1. ✅ Deployment complete
2. Test all features
3. Set up monitoring
4. Configure backups
5. Share access with team

---

## 📞 Need Help?

- **Docker issues?** Check [Troubleshooting → Docker](#problem-connection-refused-on-api)
- **Database issues?** Check [Troubleshooting → Database](#problem-database-error)
- **SSL issues?** Check [Troubleshooting → SSL](#problem-ssl-certificate-failed)
- **Other issues?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

**Last Updated:** December 23, 2025  
**Recommended:** Option 1 (Docker) - Much simpler!  
**Questions?** GitHub Issues: https://github.com/Adiuk24/tapmad_career_portal/issues

**Choose your option above and start deploying! 🚀**
