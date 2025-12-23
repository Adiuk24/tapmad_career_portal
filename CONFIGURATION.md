# Configuration Guide

This guide will help you configure the Tapmad Career Portal for development and production.

## Quick Setup

Run the setup script:
```bash
./setup.sh
```

Or manually:
```bash
# Install dependencies
npm run install:all

# Copy environment files
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

## Environment Variables

### Backend Configuration (`backend/.env`)

#### Required Variables

**Database:**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/tapmad_career?schema=public"
```
- Replace `username`, `password`, and `localhost:5432` with your PostgreSQL credentials
- Replace `tapmad_career` with your database name

**Server:**
```env
PORT=8000
NODE_ENV=development
```

**JWT Authentication:**
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d
```
- Generate a secure random string (minimum 32 characters)
- You can use: `openssl rand -base64 32`

**CORS:**
```env
FRONTEND_URL=http://localhost:3000
```
- Update this to your frontend URL in production

#### Optional Variables

**Email (SMTP):**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@tapmad.com
```

For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in `SMTP_PASSWORD`

For other providers, update `SMTP_HOST` and `SMTP_PORT` accordingly.

**File Upload:**
```env
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```
- `MAX_FILE_SIZE` is in bytes (default: 5MB)

### Frontend Configuration (`frontend/.env`)

#### Required Variables

**NextAuth:**
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production-min-32-chars
```
- Generate a secure random string (minimum 32 characters)
- Should be different from `JWT_SECRET`

**Database:**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/tapmad_career?schema=public"
```
- Same as backend `DATABASE_URL`

**API URL:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```
- Update to your backend URL in production

#### Optional Variables (Social Login)

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**LinkedIn OAuth:**
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Add redirect URL: `http://localhost:3000/api/auth/callback/linkedin`
4. Request access to Sign In with LinkedIn

```env
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
```

## Database Setup

### 1. Install PostgreSQL

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download from [PostgreSQL website](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE tapmad_career;

# Create user (optional)
CREATE USER tapmad_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE tapmad_career TO tapmad_user;

# Exit
\q
```

### 3. Run Migrations

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

## Development Setup

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Configure Environment

Update `.env` files in both `frontend/` and `backend/` directories.

### 3. Start Development Servers

**Option 1: Run both together**
```bash
npm run dev
```

**Option 2: Run separately**
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Prisma Studio: http://localhost:5555 (run `npx prisma studio` in backend directory)

## Production Configuration

### Security Checklist

- [ ] Change all default secrets (`JWT_SECRET`, `NEXTAUTH_SECRET`)
- [ ] Use strong database passwords
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper CORS origins
- [ ] Use HTTPS in production
- [ ] Set up proper file storage (S3, etc.) for resumes
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging

### Environment Variables for Production

Update these in your hosting platform:

**Backend:**
- `DATABASE_URL` - Production PostgreSQL connection string
- `JWT_SECRET` - Strong random secret
- `NODE_ENV=production`
- `FRONTEND_URL` - Your production frontend URL
- `SMTP_*` - Production email service credentials

**Frontend:**
- `NEXTAUTH_URL` - Your production frontend URL
- `NEXTAUTH_SECRET` - Strong random secret
- `DATABASE_URL` - Same as backend
- `NEXT_PUBLIC_API_URL` - Your production backend API URL
- OAuth credentials for production domains

### Database Migration in Production

```bash
cd backend
npx prisma migrate deploy
```

## Troubleshooting

### Database Connection Issues

1. Verify PostgreSQL is running:
   ```bash
   # macOS/Linux
   pg_isready
   
   # Or check service status
   brew services list  # macOS
   sudo systemctl status postgresql  # Linux
   ```

2. Test connection:
   ```bash
   psql -U username -d tapmad_career -h localhost
   ```

3. Check `DATABASE_URL` format:
   ```
   postgresql://username:password@host:port/database?schema=public
   ```

### Port Already in Use

If port 3000 or 8000 is already in use:

**Frontend:**
```bash
# Update frontend/.env
NEXTAUTH_URL=http://localhost:3001

# Or run on different port
PORT=3001 npm run dev:frontend
```

**Backend:**
```bash
# Update backend/.env
PORT=8001

# Update frontend/.env
NEXT_PUBLIC_API_URL=http://localhost:8001/api
```

### Email Not Sending

1. Verify SMTP credentials
2. Check if your email provider requires app passwords (Gmail)
3. Check firewall/network restrictions
4. Review email service logs in backend console

### Authentication Issues

1. Verify `NEXTAUTH_SECRET` is set and matches
2. Check `NEXTAUTH_URL` matches your actual URL
3. Clear browser cookies and try again
4. Check browser console for errors

## Next Steps

After configuration:

1. ✅ Create your first HR user account
2. ✅ Post your first job
3. ✅ Test the application flow
4. ✅ Configure email notifications
5. ✅ Set up OAuth providers (optional)

## Support

For issues or questions, refer to:
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)
- [README](./README.md)
- Prisma documentation: https://www.prisma.io/docs
- NextAuth.js documentation: https://next-auth.js.org

