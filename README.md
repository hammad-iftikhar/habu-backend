# Habu Backend

Express + TypeScript backend for [habu](https://github.com/hammad-iftikhar/habu.git).

## Tech Stack

- Node.js + TypeScript
- Express
- PostgreSQL
- Drizzle ORM + Drizzle Kit
- JWT + bcrypt
- Docker Compose (local Postgres)

## Project Structure

```text
src/
  controllers/      # Route handlers
  routes/           # Express routes
  middleware/       # Middlewares
  repositories/     # DB access layer
  db/
    schema/         # Drizzle table definitions
    index.ts        # Drizzle client
```

## Prerequisites

- Node.js 20+
- npm
- Docker + Docker Compose (recommended for local DB)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Set an app secret in `.env`:

```env
APP_KEY=<your-random-secret>
```

You can generate one with:

```bash
openssl rand -hex 32
```

## Database

### Start PostgreSQL via Docker

```bash
docker compose up -d --build
```

This starts Postgres at `localhost:5436` with the default credentials from `.env.example`.

### Run migrations

```bash
npm run db:migrate
```

### Optional Drizzle commands

```bash
npm run db:generate
npm run db:studio
```

## Run the App

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm run start
```

Server default URL: `http://localhost:3000`

## Useful Scripts

- `npm run dev` - Run with `nodemon` + `tsx`
- `npm run build` - Compile TypeScript to `dist/`
- `npm run start` - Start compiled server
- `npm run lint` - Run ESLint
- `npm run format` - Format source files with Prettier
- `npm run db:generate` - Generate Drizzle migration files
- `npm run db:migrate` - Apply migrations
- `npm run db:studio` - Open Drizzle Studio

## Notes

- CORS is enabled only when `NODE_ENV=development`.
