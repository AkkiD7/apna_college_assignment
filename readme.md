# DSA Sheet Tracker

A full-stack MERN assignment project for the Apna College Full Stack Developer role. The app provides seeded login, a topic-wise DSA sheet, external learning links, and per-user progress persistence.

## Tech Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, React Router
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT
- Validation and testing: Zod, Vitest, Testing Library, Supertest-ready backend setup
- Deployment target: AWS S3 + CloudFront for frontend, EC2 for backend, MongoDB Atlas for data

## Features

- Seeded demo login with JWT auth
- Topic -> problem hierarchy with difficulty badges
- Resource links for YouTube, LeetCode, and articles
- Progress tracking stored per user in MongoDB
- Loading, empty, and error states
- Feature-based folder structure on both client and server

## Demo Credentials

- Email: `demo@apnacollege.com`
- Password: `Pass@123`

## Project Structure

```text
.
|-- client
|-- server
`-- readme.md
```

## Local Setup

### 1. Install dependencies separately

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure environment variables

Create `server/.env` from `server/.env.example`:

```bash
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/dsa_sheet_app
JWT_SECRET=replace-with-a-secure-secret
CLIENT_ORIGIN=http://localhost:5173
SEED_DEMO_USER_EMAIL=demo@apnacollege.com
SEED_DEMO_USER_PASSWORD=Pass@123
```

Create `client/.env` from `client/.env.example`:

```bash
VITE_API_BASE_URL=http://localhost:4000/api
```

### 3. Run the app

```bash
cd server
npm run dev

# in another terminal
cd client
npm run dev
```

This starts:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## API Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/topics`
- `GET /api/progress`
- `POST /api/progress`

### Sample Progress Payload

```json
{
  "problemId": "arrays-two-sum",
  "completed": true
}
```

## Available Scripts

From `server/`:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run seed`
- `npm run test`

From `client/`:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run test`

## AWS Deployment Notes

### Frontend

1. Run `npm install` inside `client/`.
2. Build the React app with `npm run build`.
3. Upload `client/dist` to an S3 bucket configured for static hosting.
4. Put CloudFront in front of the bucket for HTTPS and caching.
5. Set `VITE_API_BASE_URL` to the deployed backend URL before building.

### Backend

1. Provision a small EC2 instance.
2. Install Node.js and clone the repo.
3. Run `npm install` inside `server/`.
4. Configure `server/.env` with production values.
5. Run `npm run build` and start the API from `dist` with PM2 or systemd.
6. Expose the instance through Nginx or directly via a load balancer if needed.
7. Set `CLIENT_ORIGIN` to the CloudFront domain so CORS remains locked down.

### Database

1. Create a MongoDB Atlas cluster.
2. Add the EC2 public IP to the Atlas allowlist.
3. Store the Atlas connection string in `MONGODB_URI`.

## Architecture Notes

- Topics and problems are seeded into MongoDB instead of being hardcoded into the frontend.
- Progress is stored separately with a unique index on `userId + problemId`.
- The current implementation is optimized for assignment speed while keeping the architecture scalable.
- For larger scale, topic data can be cached and progress queries can be indexed further or moved behind a dedicated service.

## Test Coverage

The repo includes focused tests for:

- Auth success and failure flows
- Topic ordering logic
- Auth middleware protection
- Progress update semantics
- Login UI submission
- Problem completion interactions
