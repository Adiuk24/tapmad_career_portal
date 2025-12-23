# 🚀 Deploy to Your Own Server — Simple Guide

**Target:** Deploy Tapmad Career Portal to your own Linux/Ubuntu server.  
**Time:** ~30 minutes setup + 10 minutes per redeploy.

---

## Prerequisites

Your server must have:
- **Ubuntu 20.04+** or similar Linux distribution
- **SSH access** (for you to connect)
- **4GB RAM** (minimum; 8GB recommended)
- **20GB disk space** (minimum; depends on file uploads)
- **Internet connection** (for npm, Docker registries, etc.)

---

## Architecture

```
Your Server
├── PostgreSQL (database)
├── Backend (Node.js/Express on port 8000)
└── Frontend (Next.js on port 3000)

Users → Frontend (3000) ↔ Backend (8000) ↔ PostgreSQL
```

---

## Option 1: Deploy with Docker (Recommended - Simplest)

### Step 1: Install Docker on Your Server

```bash
# SSH into your server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker --version
docker-compose --version
```

### Step 2: Clone Your Repository

```bash
# On your server
cd /home/ubuntu  # or your preferred directory
git clone https://github.com/Adiuk24/tapmad_career_portal.git
cd tapmad_career_portal
```

### Step 3: Create Production .env File

```bash
# On your server, create .env for docker-compose
cat > .env << 'EOF'
# Production secrets (change these!)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-change-this
NEXTAUTH_SECRET=your-nextauth-secret-key-min-32-characters-change-this

# URLs
FRONTEND_URL=https://yourdomain.com  # Change to your domain
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api

# Database (optional - Docker uses postgres service by default)
# DATABASE_URL is set in docker-compose.yml

# Email (optional - leave as-is if not needed)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@tapmad.com

# OAuth (optional - leave blank if not needed)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
EOF
```

### Step 4: Start Services with Docker Compose

```bash
# On your server, in the project directory
docker-compose up -d --build

# Wait for services to start (30-60 seconds)
sleep 30

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend  # View backend logs
docker-compose logs -f frontend  # View frontend logs
```

### Step 5: Run Database Migrations

```bash
# Run migrations (creates tables)
docker-compose exec backend npx prisma migrate deploy

# If first time, use:
docker-compose exec backend npx prisma migrate dev --name init
```

### Step 6: Set Up Nginx (Reverse Proxy)

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx config
sudo tee /etc/nginx/sites-available/tapmad << 'EOF'
upstream backend {
    server localhost:8000;
}

upstream frontend {
    server localhost:3000;
}

server {
    listen 80;
    server_name yourdomain.com;  # Change this

    # Redirect HTTP to HTTPS (optional, but recommended)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;  # Change this

    # SSL certificates (use Let's Encrypt - see Step 7)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://backend/health;
    }
}
EOF

# Enable the config
sudo ln -s /etc/nginx/sites-available/tapmad /etc/nginx/sites-enabled/tapmad

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 7: Set Up SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate (automatic)
sudo certbot certonly --nginx -d yourdomain.com  # Change this

# This will prompt you for email and to agree to terms
# Certificates are auto-renewed by Let's Encrypt

# Verify
sudo ls -la /etc/letsencrypt/live/yourdomain.com/
```

### Step 8: Test Your Deployment

```bash
# Check services are running
docker-compose ps

# Check logs for errors
docker-compose logs --tail=50

# Test API
curl https://yourdomain.com/health

# Open in browser
# https://yourdomain.com
```

### Step 9: Set Up Auto-Restart and Backups

```bash
# Make docker-compose start on server reboot
cat > ~/tapmad-startup.sh << 'EOF'
#!/bin/bash
cd /home/ubuntu/tapmad_career_portal
docker-compose up -d
EOF

chmod +x ~/tapmad-startup.sh

# Add to crontab (runs on reboot)
(crontab -l 2>/dev/null; echo "@reboot /home/ubuntu/tapmad-startup.sh") | crontab -

# Backup database daily
cat > ~/backup-db.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
mkdir -p $BACKUP_DIR
docker-compose exec -T postgres pg_dump -U postgres tapmad_career > $BACKUP_DIR/tapmad_$(date +%Y%m%d_%H%M%S).sql
EOF

chmod +x ~/backup-db.sh

# Add to crontab (runs daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /home/ubuntu/backup-db.sh") | crontab -
```

---

## Option 2: Deploy Without Docker (Manual Setup)

### Step 1: Install Dependencies on Server

```bash
# SSH into your server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install Nginx
sudo apt install nginx -y

# Verify
node --version
npm --version
psql --version
```

### Step 2: Set Up PostgreSQL

```bash
# Create database
sudo -u postgres createdb tapmad_career

# Create user and grant permissions
sudo -u postgres psql << EOF
CREATE USER tapmad_user WITH PASSWORD 'your-secure-password-here';
GRANT ALL PRIVILEGES ON DATABASE tapmad_career TO tapmad_user;
ALTER DATABASE tapmad_career OWNER TO tapmad_user;
EOF

# Verify
psql -U tapmad_user -d tapmad_career -c "SELECT 1"
```

### Step 3: Clone and Set Up Application

```bash
# Clone repo
cd /home/ubuntu
git clone https://github.com/Adiuk24/tapmad_career_portal.git
cd tapmad_career_portal

# Install dependencies
npm run install:all

# Create .env files
cat > backend/.env << 'EOF'
DATABASE_URL="postgresql://tapmad_user:your-secure-password-here@localhost:5432/tapmad_career?schema=public"
PORT=8000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://yourdomain.com
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
EOF

cat > frontend/.env << 'EOF'
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-nextauth-secret-key-min-32-characters
DATABASE_URL="postgresql://tapmad_user:your-secure-password-here@localhost:5432/tapmad_career?schema=public"
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
EOF

# Generate Prisma and run migrations
cd backend
npx prisma generate
npx prisma migrate deploy

# Build frontend and backend
npm run build
cd ../frontend
npm run build
```

### Step 4: Set Up Systemd Services

```bash
# Backend service
sudo tee /etc/systemd/system/tapmad-backend.service << 'EOF'
[Unit]
Description=Tapmad Career Portal Backend
After=network.target postgresql.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/tapmad_career_portal/backend
Environment="NODE_ENV=production"
ExecStart=/usr/bin/node dist/app.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Frontend service
sudo tee /etc/systemd/system/tapmad-frontend.service << 'EOF'
[Unit]
Description=Tapmad Career Portal Frontend
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/tapmad_career_portal/frontend
Environment="NODE_ENV=production"
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start services
sudo systemctl daemon-reload
sudo systemctl enable tapmad-backend tapmad-frontend
sudo systemctl start tapmad-backend tapmad-frontend

# Check status
sudo systemctl status tapmad-backend
sudo systemctl status tapmad-frontend
```

### Step 5: Set Up Nginx and SSL (Same as Option 1, Steps 6-7)

See Option 1 steps 6-7 above.

---

## Monitoring & Maintenance

### Check Logs

```bash
# Docker
docker-compose logs -f backend
docker-compose logs -f frontend

# Manual
sudo journalctl -u tapmad-backend -f
sudo journalctl -u tapmad-frontend -f
```

### Monitor Disk Space

```bash
df -h

# If disk is full, clean Docker images:
docker system prune -a
```

### Monitor Database

```bash
# Connect to database
psql -U tapmad_user -d tapmad_career

# Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Update Application

```bash
# Pull latest code
cd /home/ubuntu/tapmad_career_portal
git pull origin main

# Rebuild and restart (Docker)
docker-compose down
docker-compose up -d --build

# Or manual
npm run build
sudo systemctl restart tapmad-backend tapmad-frontend
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend not responding | Check logs: `docker-compose logs backend` or `sudo journalctl -u tapmad-backend` |
| Database connection error | Verify PostgreSQL running: `sudo systemctl status postgresql` |
| Port already in use | Kill existing process: `sudo lsof -i :8000` then `kill -9 <PID>` |
| SSL certificate error | Renew manually: `sudo certbot renew --dry-run` |
| High disk usage | Clean old Docker images: `docker system prune -a` |
| Frontend blank page | Check NEXT_PUBLIC_API_URL points to backend |
| API calls fail | Verify Nginx proxy config and backend is running |

---

## Security Checklist

- [ ] Changed default JWT_SECRET and NEXTAUTH_SECRET
- [ ] Changed PostgreSQL password
- [ ] Set NODE_ENV=production
- [ ] Enabled SSL/HTTPS
- [ ] Set up firewall (UFW) to allow only ports 22, 80, 443
- [ ] Disabled SSH password auth (use SSH keys only)
- [ ] Set up automated backups
- [ ] Configured log rotation
- [ ] Set up monitoring/alerts

---

## Support

If something breaks:
1. Check logs: `docker-compose logs -f`
2. Verify all services are running: `docker-compose ps`
3. Test backend API: `curl https://yourdomain.com/health`
4. Check database connection: `psql -U tapmad_user -d tapmad_career -c "SELECT 1"`
5. Review this guide and `FULL_REVIEW_REPORT.md`

---

**Ready to deploy?** Start with Option 1 (Docker) — it's faster and less error-prone!
