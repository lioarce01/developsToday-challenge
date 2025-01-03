# Country Info API

This is the backend API for the Country Information application. It provides endpoints to fetch country information from various sources and caches the data using Prisma with SQLite.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on port 3001 by default.

## API Endpoints

- `GET /api/countries`: Get a list of all available countries
- `GET /api/countries/:countryCode`: Get detailed information about a specific country

## Environment Variables

Create a `.env` file with the following variables:
```
DATABASE_URL="file:./dev.db"
PORT=3001
```