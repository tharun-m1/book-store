# 📚 Book Store

A full-stack web application for managing and browsing books, built with React, Node.js, and PostgreSQL. This modern web application provides a seamless experience for users to explore and manage their book collection.

## 🌟 Features

- **Book Management**

  - Browse and search books with advanced filtering
  - View detailed book information including cover images, descriptions, and metadata
  - Add, edit, and remove books (admin functionality)
  - Sort and filter books by various criteria

- **User Features**

  - User registration and authentication
  - Secure JWT-based authorization

- **Technical Features**
  - Responsive design optimized for mobile, tablet, and desktop
  - RESTful API architecture
  - Database migrations
  - Error handling and logging
  - Input validation and sanitization

## 🛠️ Tech Stack

### Frontend

- **Core**: React 18 with Vite
- **Styling**: Tailwind CSS with custom configurations
- **State Management**: Redux toolkit
- **Routing**: React Router v6
- **HTTP Client**: Axios

### Backend

- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Database**: PostgreSQL 17
- **ORM**: Prisma
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 16 or higher)
- npm (version 8 or higher)
- Docker Desktop
- Git

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tharun-m1/book-store.git
cd book-store
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### 3. Database Setup

```bash
# Start PostgreSQL container
docker run --name bookstore_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=bookstore \
  -p <YOUR_MACHINE_PORT>:5432 \
  -d \
  postgres:latest

# Verify container is running
docker ps
```

### 4. Backend Setup

```bash
# Navigate to server directory
cd ../server

# Install dependencies
npm install

# Create and configure .env file
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
DATABASE_URL="postgresql://bookstore:bookstore@localhost:5433/postgres"
PORT=4000
JWT_SECRET="your-secure-secret-key"
```

```bash
# Run database migrations
npx prisma migrate dev

# Start the server
npm run dev  # Uses nodemon
# OR
node index.js
```

### 5. Frontend Configuration

Update the API base URL in `frontend/src/config.js`:

```javascript
export const BASE_URL = "http://localhost:4000/api/v1";
```

## 📝 API Documentation

The API endpoints are documented using Swagger UI and can be accessed at:
`http://localhost:4000/api-docs` when the server is running.

## 🔒 Security

- All passwords are hashed using bcrypt
- JWT tokens are used for authentication
- API endpoints are protected with appropriate middleware
- Input validation is performed on all requests
- CORS is configured for security

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
