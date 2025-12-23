# Tapmad Career Portal

A comprehensive career portal for Tapmad with HR dashboard for job posting and candidate management, and applicant portal for job browsing and applications.

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js

## Project Structure

```
.
├── frontend/          # Next.js frontend application
├── backend/           # Node.js/Express backend API
└── package.json       # Root workspace configuration
```

## Getting Started

### Quick Setup

Run the automated setup script:
```bash
./setup.sh
```

This will:
- Install all dependencies
- Create `.env` files from examples
- Guide you through the next steps

### Manual Setup

#### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Environment variables configured

#### Installation

```bash
# Install all dependencies
npm run install:all

# Set up environment variables
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

**Important:** Edit both `.env` files with your configuration:
- Database connection string
- JWT and NextAuth secrets
- SMTP settings (for email)
- OAuth credentials (optional)

See [CONFIGURATION.md](./CONFIGURATION.md) for detailed setup instructions.

#### Database Setup

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations to create database tables
npx prisma migrate dev

# (Optional) Open Prisma Studio to view/manage data
npx prisma studio
```

#### Development

```bash
# Run both frontend and backend
npm run dev

# Or run separately
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:8000
```

## Features

- **HR Dashboard**: Post jobs, manage applications, view analytics
- **Applicant Portal**: Browse jobs, apply with resume, track applications
- **Authentication**: Email/password and social login (Google, LinkedIn)
- **Email Notifications**: Automated status updates and job alerts

## Deployment

### Quick Deploy with Docker

```bash
# Automated deployment
./deploy.sh

# Or manually
docker-compose up -d --build
```

### Cloud Deployment

- **Frontend**: Deploy to Vercel (recommended for Next.js)
- **Backend**: Deploy to Railway, Render, or DigitalOcean
- **Database**: Use managed PostgreSQL (Railway, Supabase, etc.)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## License

Private - Tapmad

