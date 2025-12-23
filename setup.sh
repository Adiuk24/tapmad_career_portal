#!/bin/bash

# Tapmad Career Portal Setup Script

echo "🚀 Setting up Tapmad Career Portal..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if PostgreSQL is available (optional check)
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL client not found. Make sure PostgreSQL is installed and running."
else
    echo "✅ PostgreSQL client found"
fi

echo ""
echo "📦 Installing dependencies..."

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo "📝 Setting up environment variables..."

# Create .env files from examples if they don't exist
if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    echo "✅ Created frontend/.env (please update with your values)"
else
    echo "ℹ️  frontend/.env already exists"
fi

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env (please update with your values)"
else
    echo "ℹ️  backend/.env already exists"
fi

echo ""
echo "🔧 Next steps:"
echo ""
echo "1. Update environment variables:"
echo "   - Edit frontend/.env with your configuration"
echo "   - Edit backend/.env with your database and SMTP settings"
echo ""
echo "2. Set up your PostgreSQL database:"
echo "   - Create a database named 'tapmad_career' (or update DATABASE_URL)"
echo "   - Update DATABASE_URL in backend/.env"
echo ""
echo "3. Generate Prisma client and run migrations:"
echo "   cd backend"
echo "   npx prisma generate"
echo "   npx prisma migrate dev"
echo ""
echo "4. Start the development servers:"
echo "   npm run dev"
echo ""
echo "✨ Setup complete! Don't forget to configure your .env files."

