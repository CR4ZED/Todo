# Project guide

npm workspaces: `backend/` (Express 4 + TS + Mongoose + zod) and `frontend/` (Vite + React).
Run: `npm run dev` (also starts mongo via docker compose), `npm test`, `npm run seed`. Typecheck: `npm run typecheck -w backend`.

## Module pattern (`backend/src/modules/<name>/`)
Copy `todos/`. Files: `<n>.model.ts` (mongoose), `<n>.schema.ts` (zod),
`<n>.service.ts`, `<n>.controller.ts`, `<n>.routes.ts`.
Register the router in `backend/src/app.ts` (`app.use("/<names>", routes)`) — above `notFound`.

## Layering
- Controllers stay thin: `try { res.json(await service.fn(...)) } catch (err) { next(err) }`. No DB calls, no business logic.
- All DB logic lives in services; they throw `AppError`.
- Validate every request with `validate({ body, query, params })` in routes; parsed values replace req.*.

## Errors
Always JSON: `{ error: { code, message, details? } }`.
Throw `new AppError(status, "CODE", "message", details?)`. Never `res.status(4xx).json` by hand.
errorHandler already maps: bad JSON -> 400, anything else -> 500.
Validate ids with `idParams` (zod regex) so bad ids give 400, not 500.

## Pagination
Cursor, not skip: `?limit=20&cursor=<lastId>`; sort `_id: -1`, filter `_id < cursor`, fetch `limit + 1`.
Respond `{ data, nextCursor }` (`nextCursor` = last id of page, or `null`).

## Tests
vitest + supertest in `backend/test/`, import `app` from `src/app`, real Mongo (db `todo_test`), unique title per run.
Add routes to `requests.http`.
