# Vercel deployment

Deploy this repository as two Vercel projects.

## 1. Backend project

- Import the Git repository into Vercel.
- Set **Root Directory** to `Resturant_project_backend`.
- Add these environment variables:
  - `MONGO_URI`: your MongoDB Atlas connection string.
  - `JWT_SECRET`: a long, private random string.
  - `CLIENT_URL`: the frontend Vercel URL without a trailing slash.
- Deploy and copy the generated backend URL.
- Open `https://YOUR-BACKEND.vercel.app/` and confirm it returns JSON.

MongoDB Atlas must permit connections from Vercel. Configure Atlas Network
Access and use a database user with only the permissions this app needs.

## 2. Frontend project

- Import the same Git repository as a second Vercel project.
- Set **Root Directory** to `Resturant_project_frontend`.
- Keep the detected framework as **Vite**.
- Add `VITE_API_URL` with the value
  `https://YOUR-BACKEND.vercel.app/api`.
- Deploy and copy the generated frontend URL.

## 3. Connect both projects

- Return to the backend environment variables.
- Set `CLIENT_URL` to the final frontend URL.
- Redeploy the backend so CORS uses the new frontend URL.
- If a Vercel domain changes, update its corresponding variable and redeploy.

Do not commit the real `.env` files. The `.env.example` files contain only safe
placeholders and document the required variable names.
