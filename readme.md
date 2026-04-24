# DSA Sheet Tracker

A full-stack MERN assignment project for the Apna College Full Stack Developer role. Students can log in, browse a topic-wise DSA sheet, open learning resources, mark problems as complete, and resume their saved progress later.

## Tech Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, React Router
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose
- Auth: JWT, bcrypt password hashing
- Validation: Zod
- Deployment target: AWS S3 + CloudFront for frontend, EC2 for backend, MongoDB Atlas

## Features

- Secure seeded student login
- Dashboard with overall and difficulty-wise progress summary
- 10 DSA topics with 30 problems
- Problem-level YouTube, LeetCode, and article links
- Easy, Medium, and Hard difficulty labels
- Checkbox-based progress tracking per problem
- MongoDB-backed progress persistence across login sessions
- Topic search and expandable chapter/problem view

## Demo Credentials

Email: `demo@apnacollege.com`  
Password: `Pass@123`

The login page also includes a **Use Demo Credentials** button for quick review.

## Project Structure

```text
.
|-- client   # React frontend
|-- server   # Express + MongoDB backend
`-- readme.md
```

## Local Setup

Install dependencies separately:

```bash
cd server
npm install

cd ../client
npm install
```

Create `server/.env`:

```bash
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/dsa_sheet_app
JWT_SECRET=replace-with-a-secure-secret
CLIENT_ORIGIN=http://localhost:5173
SEED_DEMO_USER_EMAIL=demo@apnacollege.com
SEED_DEMO_USER_PASSWORD=Pass@123
```

Create `client/.env`:

```bash
VITE_API_BASE_URL=http://localhost:4000/api
```

Seed the demo user and DSA topics:

```bash
cd server
npm run seed
```

Run the app:

```bash
cd server
npm run dev

# in another terminal
cd client
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Available Scripts

From `server/`:

- `npm run dev` - start the API in development mode
- `npm run build` - compile TypeScript
- `npm run start` - run the compiled server
- `npm run seed` - upsert demo user and topic data

From `client/`:

- `npm run dev` - start Vite
- `npm run build` - type-check and build frontend
- `npm run preview` - preview production build

## API Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/topics`
- `GET /api/progress`
- `POST /api/progress`

Sample progress payload:

```json
{
  "problemId": "arrays-two-sum",
  "completed": true
}
```

## Architecture Notes

- The frontend is organized by feature: auth, topics, and progress.
- Topics are seeded into MongoDB from backend seed data.
- The seed script uses upsert by topic slug, so topic changes can be applied without deleting user progress.
- Progress is stored separately with a unique `userId + problemId` index.
- Backend modules are separated by auth, topics, and progress with shared validation and error middleware.

## AWS Deployment Notes

Frontend:

1. Set `VITE_API_BASE_URL` to the deployed backend API URL.
2. Run `npm run build` inside `client/`.
3. Upload `client/dist` to S3 static hosting.
4. Put CloudFront in front of the S3 bucket.

Backend:

1. Provision an EC2 instance and install Node.js.
2. Configure production environment variables in `server/.env`.
3. Use MongoDB Atlas for `MONGODB_URI`.
4. Run `npm install`, `npm run build`, and `npm run seed`.
5. Start `dist/server.js` with PM2 or systemd.
6. Set `CLIENT_ORIGIN` to the deployed CloudFront/frontend URL.

## Assignment Deliverables

- Complete source code
- AWS frontend/backend deployment link
- 2-3 minute screen recording with audio explaining the project
