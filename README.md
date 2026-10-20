# Todo App

Express + TypeScript + Mongoose backend, React + Vite frontend, MongoDB via Docker.

## Requirements
- Node 22+
- Docker running

## Run
```sh
npm install
npm run dev      # starts Mongo (docker), API on :3000 and web on :5173
npm run seed     # optional: 30 sample todos (wipes existing ones)
```

## Commands
| Command | What it does |
|---|---|
| `npm run dev` | Mongo + backend + frontend together |
| `npm run db` | Only start Mongo (`docker compose up -d`) |
| `npm run seed` | Reset and seed todos |
| `npm test` | Backend tests (needs Mongo running) |
| `npm run typecheck -w backend` | Typecheck backend |
| `npm run build -w frontend` | Typecheck and build frontend |
| `docker compose down` | Stop Mongo |

## API
`GET /health`, `POST /todos`, `GET /todos?limit=&cursor=&done=`, `GET|PATCH|DELETE /todos/:id`.
Sample requests are in `requests.http`.

## Config
Defaults work out of the box. To override, copy `backend/.env.example` to `backend/.env` (`PORT`, `MONGO_URI`) and `frontend/.env.example` to `frontend/.env` (`VITE_API_URL`).

## Add a module
Copy `backend/src/modules/todos`, rename the files, and register the router in `backend/src/app.ts`.
