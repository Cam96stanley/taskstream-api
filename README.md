# TaskStream API

A backend API currently under development. TaskStream will allow users to manage tasks, boards, and columns — built with NestJS, Prisma, and PostgreSQL. Designed for frontend developers to integrate with their apps.

## Features

**Features coming soon**

## Tech Stack

- Backend: NestJS, TypeScript
- Database: PostgreSQL (Neon cloud-hosted)
- ORM: Prisma
- Authentication: JWT + argon2
- Development Tools: Prisma Studio, Node.js

## Getting Started

### 1. Clone the rep

```bash
git clone https://github.com/cam96stanley/taskstream-api.git
cd taskstream-api
```

### 2. Install dependencies

`npm install`

### 3. Set up environment variables

Create a .env file in the root:

```env
DATABASE_URL="postgresql://<user>:<password>@<your-neon-host>/<dbname>?sslmode=require"
JWT_SECRET=your_jwt_secret
PORT=your_port
```

- SSL is required for Neon

### 4. Run Prisma migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the server

`npm run start:dev`

### 6. Explore the database

`npx prisma studio`

- Opens a web interface to view and edit tables

## Branching Workflow

- main -> production-ready code, CI/CD deploys from this branch
- develop -> active development branch, work pushed here first

## Endpoints

**endpoints coming soon**
