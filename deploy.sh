#!/bin/bash

# Tapmad Career Portal Deployment Script

set -e

echo "🚀 Starting deployment..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose found"
echo ""

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found in root directory"
    echo "Creating .env from template..."
    cat > .env << 'EOF'
# Production Environment Variables
JWT_SECRET=change-this-to-secure-secret
NEXTAUTH_SECRET=change-this-to-secure-secret
FRONTEND_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000/api
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@tapmad.com
EOF
    echo "✅ Created .env file - PLEASE UPDATE WITH YOUR VALUES"
    echo ""
fi

# Build images
echo "📦 Building Docker images..."
docker-compose build

# Start services
echo "🚀 Starting services..."
docker-compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run migrations
echo "📊 Running database migrations..."
docker-compose exec -T backend npx prisma migrate deploy || {
    echo "⚠️  Migration failed, trying to initialize..."
    docker-compose exec -T backend npx prisma migrate dev
}

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Services:"
echo "  - Frontend: http://localhost:3000"
echo "  - Backend: http://localhost:8000"
echo "  - Database: localhost:5432"
echo ""
echo "View logs: docker-compose logs -f"
echo "Stop services: docker-compose down"
echo ""

