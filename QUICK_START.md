# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm run install:all
```

### Step 2: Set Up Environment Files
The `.env` files have been created from examples. Now you need to configure them:

**Backend (`backend/.env`):**
1. Update `DATABASE_URL` with your PostgreSQL credentials:
   ```env
   DATABASE_URL="postgresql://your_username:your_password@localhost:5432/tapmad_career?schema=public"
   ```

2. Generate and set `JWT_SECRET`:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output to `JWT_SECRET` in `backend/.env`

**Frontend (`frontend/.env`):**
1. Set `DATABASE_URL` (same as backend)
2. Generate and set `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output to `NEXTAUTH_SECRET` in `frontend/.env`

### Step 3: Set Up Database

**Create PostgreSQL database:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE tapmad_career;

# Exit
\q
```

**Run migrations:**
```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

### Step 4: Start Development Servers

```bash
# From project root
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

### Step 5: Create Your First Account

1. Go to http://localhost:3000/register
2. Create an account with role "HR Professional"
3. Log in and start posting jobs!

## 📝 Configuration Checklist

- [ ] PostgreSQL database created
- [ ] `DATABASE_URL` configured in both `.env` files
- [ ] `JWT_SECRET` set in `backend/.env`
- [ ] `NEXTAUTH_SECRET` set in `frontend/.env`
- [ ] Database migrations run successfully
- [ ] Development servers running

## 🔧 Optional Configuration

### Email Notifications
Update SMTP settings in `backend/.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@tapmad.com
```

### Social Login (Google/LinkedIn)
Add OAuth credentials to `frontend/.env`:
```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
LINKEDIN_CLIENT_ID=your-client-id
LINKEDIN_CLIENT_SECRET=your-client-secret
```

## 🆘 Troubleshooting

**Database connection error?**
- Verify PostgreSQL is running: `pg_isready`
- Check `DATABASE_URL` format
- Ensure database exists: `psql -U postgres -l`

**Port already in use?**
- Change `PORT` in `backend/.env`
- Update `NEXT_PUBLIC_API_URL` in `frontend/.env`

**Authentication not working?**
- Verify secrets are set and different
- Check `NEXTAUTH_URL` matches your frontend URL
- Clear browser cookies

For detailed configuration, see [CONFIGURATION.md](./CONFIGURATION.md)

