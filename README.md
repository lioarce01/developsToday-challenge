# Country Information Application

This is a full-stack application that provides information about countries, including their borders, population data, and flags.

## Project Structure

- `/api`: Backend Express.js + Prisma application
- `/app`: Frontend Next.js application

## Getting Started

### Backend Setup

1. Navigate to the API directory:
   ```bash
   cd api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on http://localhost:3000

## Features

- List of available countries with search functionality
- Detailed country information including:
  - Country flag
  - Border countries with navigation
  - Population data visualization
- Data caching for improved performance
- Responsive design
- Dark mode support

## Technologies Used

- Backend:
  - Express.js
  - Prisma
  - SQLite
  - TypeScript

- Frontend:
  - Next.js 13+
  - React
  - Tailwind CSS
  - shadcn/ui
  - Recharts for data visualization