# Deployment Guide

This guide covers deploying the Tapmad Career Portal to various platforms.

## 🐳 Docker Deployment (Recommended for On-Premise)

### Prerequisites
- Docker and Docker Compose installed
- Environment variables configured

### Quick Start

1. **Create `.env` file in project root:**
```env
JWT_SECRET=your-jwt-secret
NEXTAUTH_SECRET=your-nextauth-secret
FRONTEND_URL=https://your-domain.com
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@tapmad.com
```

2. **Update database password in `docker-compose.yml`:**
   - Change `POSTGRES_PASSWORD` in postgres service
   - Update `DATABASE_URL` in backend and frontend services

3. **Build and start:**
```bash
docker-compose up -d --build
```

4. **Run database migrations:**
```bash
docker-compose exec backend npx prisma migrate deploy
```

5. **Access:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000
   - Database: localhost:5432

### Individual Docker Builds

**Backend:**
```bash
docker build -f Dockerfile.backend -t tapmad-backend .
docker run -p 8000:8000 --env-file backend/.env tapmad-backend
```

**Frontend:**
```bash
docker build -f Dockerfile.frontend -t tapmad-frontend .
docker run -p 3000:3000 --env-file frontend/.env tapmad-frontend
```

## ☁️ Cloud Deployment

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Deploy Frontend to Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
cd frontend
vercel
```

3. **Configure Environment Variables in Vercel Dashboard:**
   - `NEXTAUTH_URL` - Your Vercel deployment URL
   - `NEXTAUTH_SECRET` - Your secret
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXT_PUBLIC_API_URL` - Your backend API URL
   - OAuth credentials (if using)

#### Deploy Backend to Railway

1. **Install Railway CLI:**
```bash
npm i -g @railway/cli
```

2. **Login and initialize:**
```bash
railway login
cd backend
railway init
```

3. **Add PostgreSQL service:**
```bash
railway add postgresql
```

4. **Set environment variables:**
```bash
railway variables set JWT_SECRET=your-secret
railway variables set FRONTEND_URL=https://your-frontend.vercel.app
railway variables set NODE_ENV=production
# Add other required variables
```

5. **Deploy:**
```bash
railway up
```

6. **Run migrations:**
```bash
railway run npx prisma migrate deploy
```

### Option 2: Render

#### Deploy Backend to Render

1. **Create new Web Service:**
   - Connect your GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Start Command: `npx prisma migrate deploy && node dist/app.js`

2. **Add PostgreSQL Database:**
   - Create new PostgreSQL database
   - Copy connection string to `DATABASE_URL`

3. **Set Environment Variables:**
   - All variables from `backend/.env.example`

#### Deploy Frontend to Render

1. **Create new Web Service:**
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

2. **Set Environment Variables:**
   - All variables from `frontend/.env.example`

### Option 3: DigitalOcean App Platform

1. **Create App:**
   - Connect GitHub repository
   - Select monorepo structure

2. **Configure Backend Component:**
   - Source Directory: `backend`
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Run Command: `npx prisma migrate deploy && node dist/app.js`

3. **Configure Frontend Component:**
   - Source Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Run Command: `npm start`

4. **Add Database:**
   - Create managed PostgreSQL database
   - Link to both components

5. **Set Environment Variables:**
   - Configure in App Platform dashboard

## 🔧 Production Build

### Build Locally

```bash
# Build both
npm run build

# Or individually
npm run build:frontend
npm run build:backend
```

### Production Checklist

- [ ] Set `NODE_ENV=production` in all environments
- [ ] Use strong, unique secrets for `JWT_SECRET` and `NEXTAUTH_SECRET`
- [ ] Configure production database (managed PostgreSQL recommended)
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure CORS with production frontend URL
- [ ] Set up email service (SMTP)
- [ ] Configure file storage for resumes (S3, etc.)
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up backups for database
- [ ] Test all authentication flows
- [ ] Verify email notifications work

## 📊 Database Migration in Production

**Important:** Always backup your database before running migrations in production.

```bash
# Using Prisma
cd backend
npx prisma migrate deploy

# Or with Docker
docker-compose exec backend npx prisma migrate deploy
```

## 🔒 Security Best Practices

1. **Secrets Management:**
   - Never commit `.env` files
   - Use platform secrets management (Vercel, Railway, etc.)
   - Rotate secrets regularly

2. **Database:**
   - Use managed PostgreSQL services
   - Enable SSL connections
   - Use strong passwords
   - Restrict network access

3. **API Security:**
   - Enable rate limiting
   - Use HTTPS only
   - Validate all inputs
   - Implement CORS properly

4. **File Uploads:**
   - Validate file types and sizes
   - Store files securely (S3, etc.)
   - Scan for malware
   - Use signed URLs for downloads

## 🚀 Quick Deploy Scripts

### Docker Quick Deploy
```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Production Build Script
```bash
#!/bin/bash
# deploy.sh

echo "Building for production..."
npm run build

echo "Building Docker images..."
docker-compose build

echo "Starting services..."
docker-compose up -d

echo "Running migrations..."
docker-compose exec backend npx prisma migrate deploy

echo "Deployment complete!"
```

## 📝 Environment Variables Reference

### Backend Production Variables
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db?schema=public&sslmode=require
PORT=8000
JWT_SECRET=strong-random-secret-min-32-chars
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend-domain.com
SMTP_HOST=smtp.provider.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-password
EMAIL_FROM=noreply@tapmad.com
```

### Frontend Production Variables
```env
NODE_ENV=production
NEXTAUTH_URL=https://your-frontend-domain.com
NEXTAUTH_SECRET=strong-random-secret-min-32-chars
DATABASE_URL=postgresql://user:pass@host:5432/db?schema=public&sslmode=require
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
LINKEDIN_CLIENT_ID=your-client-id
LINKEDIN_CLIENT_SECRET=your-client-secret
```

## 🆘 Troubleshooting

### Build Failures
- Check Node.js version (18+ required)
- Verify all dependencies are installed
- Check for TypeScript errors
- Ensure Prisma Client is generated

### Database Connection Issues
- Verify connection string format
- Check network/firewall rules
- Ensure database is accessible
- Verify SSL mode if required

### Deployment Issues
- Check environment variables are set
- Verify build commands are correct
- Check platform logs for errors
- Ensure migrations run successfully

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

