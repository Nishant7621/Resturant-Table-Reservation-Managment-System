# Restaurant Table Reservation Management System

## Project overview

The Restaurant Table Reservation Management System is a full-stack web
application that connects customers with restaurants. Customers can search for
restaurants by location, register or log in, reserve tables, view their
bookings, and submit reviews. Restaurant owners can register their restaurant,
view incoming booking requests, and confirm or decline reservations.

The project is divided into two applications:

```text
Resturant_project_frontend   React customer and restaurant-owner interface
Resturant_project_backend    Express REST API and MongoDB data layer
```

## Technology stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- bcrypt
- CORS
- dotenv

### Hosting

- Render Static Site for the frontend
- Render Web Service for the backend
- MongoDB Atlas for the cloud database
- GitHub for source control

## Frontend development

The frontend is located in `Resturant_project_frontend`.

### Application entry and routing

- `src/main.jsx` starts the React application.
- `src/App.jsx` defines the application routes.
- React Router handles navigation between the home, login, registration,
  reservation, booking, and restaurant-dashboard pages.

### Main pages

- `Home.jsx` assembles the landing-page sections.
- `Login.jsx` authenticates customers and restaurant owners.
- `Register.jsx` creates customer or restaurant-owner accounts.
- `Reservation.jsx` collects the reservation date, time, and guest count.
- `Bookings.jsx` displays the logged-in customer's reservations.
- `RestaurantDashboard.jsx` displays restaurant details, metrics, and booking
  requests for the restaurant owner.

### Reusable components

- `Navbar.jsx` provides navigation, account actions, and logout.
- `Hero.jsx` introduces the service.
- `SearchSection.jsx` collects city, area, date, time, and guest filters.
- `FeaturedRestaurants.jsx` loads and displays matching restaurants.
- `WhyChooseUs.jsx` explains the platform benefits.
- `Reviews.jsx` displays recent customer reviews.
- `WriteReview.jsx` filters restaurants by city and submits a review.
- `Footer.jsx` contains support contact details and location information.

### API connection

`src/services/api.js` creates a shared Axios client. The deployed frontend reads
the API URL from:

```text
VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api
```

The Axios request interceptor adds the stored JWT to authenticated requests.
The response interceptor removes invalid login data after a `401` response.

## Backend development

The backend is located in `Resturant_project_backend`.

### Server

`server.js` performs the following tasks:

1. Loads environment variables.
2. Connects to MongoDB.
3. Creates the Express application.
4. Enables JSON and form-body parsing.
5. Configures CORS for the frontend domain.
6. mounts authentication, restaurant, reservation, and review routes.
7. Starts the HTTP server using Render's `PORT` value.

### Models

- `User.js` stores customer and restaurant-owner accounts.
- `Restaurant.js` stores restaurant details, location, capacity, and slots.
- `Reservation.js` stores customer bookings and their status.
- `Review.js` stores ratings and customer comments.
- `Table.js` provides the structure for table-related data.

### Controllers

- `authController.js` registers users, hashes passwords, validates credentials,
  and creates JWTs.
- `restaurantController.js` lists and filters restaurants, loads the owner
  dashboard, and updates reservation statuses.
- `reservationController.js` creates reservations and returns a customer's
  bookings.
- `reviewController.js` creates and lists restaurant reviews.

### Routes

```text
POST  /api/auth/register
POST  /api/auth/login

GET   /api/restaurants
GET   /api/restaurants/:id
GET   /api/restaurants/owner/dashboard
PATCH /api/restaurants/owner/reservations/:reservationId

POST  /api/reservations
GET   /api/reservations/me

GET   /api/reviews
POST  /api/reviews
```

### Authentication and authorization

Passwords are hashed with bcrypt before being stored. Successful login returns
a signed JWT. Protected routes use `authMiddleware.js` to verify that token.
Restaurant-owner routes also use `roleMiddleware.js` to check the account role.

Secrets must only be stored in the backend hosting environment:

```text
MONGO_URI
JWT_SECRET
CLIENT_URL
```

Real values must never be committed to GitHub.

## MongoDB Atlas connection

The production database was created using a MongoDB Atlas free cluster.

### Atlas setup

1. Create an Atlas project and free cluster.
2. Create a dedicated database user with a strong private password.
3. Configure the Atlas IP access list for the deployed backend.
4. Choose **Connect → Drivers → Node.js**.
5. Copy the `mongodb+srv://` connection string.
6. Add the application database name to the connection string.
7. Store the completed string in Render as `MONGO_URI`.

Example structure:

```text
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/restaurantReservation
```

The real username, password, and cluster credentials must not appear in source
files, screenshots, documentation, or Git commits.

### Backend connection

`src/config/db.js` uses Mongoose to connect with `process.env.MONGO_URI`. The
backend should log a successful MongoDB connection after deployment.

## Render deployment

### Backend Web Service

```text
Root Directory: Resturant_project_backend
Build Command: npm install
Start Command: npm start
```

Backend environment variables:

```text
MONGO_URI=<private Atlas connection string>
JWT_SECRET=<private random secret>
CLIENT_URL=https://YOUR-FRONTEND-DOMAIN
```

### Frontend Static Site

```text
Root Directory: Resturant_project_frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

Frontend environment variable:

```text
VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api
```

React Router requires this Render rewrite:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```

## Reservation charge interface

The reservation page currently displays a charge of ₹50 per guest and
calculates the total from the selected guest count. The interface includes a
“Proceed to Payment” button, but a real payment gateway is not connected yet.

Future payment integration must create and verify payments on the backend.
Payment secret keys must never be placed in React code or `VITE_` variables.

## Security roadmap

### Immediate priorities

- Keep the GitHub repository private.
- Never commit `.env` files.
- Rotate any credential that was previously exposed.
- Return only public restaurant fields from public API endpoints.
- Add rate limiting to login, registration, review, and reservation endpoints.
- Add secure HTTP headers with Helmet.
- Validate and sanitize all request values.
- Require verification or administrator approval for restaurant accounts.
- Use generic production errors instead of returning database error details.

### Later improvements

- Add email verification and password reset.
- Add restaurant-owner approval.
- Add duplicate-booking and slot-capacity checks.
- Add verified-review rules based on completed reservations.
- Add a real payment gateway with server-side verification.
- Add automated tests for controllers and protected routes.
- Add logging, monitoring, backups, and an incident-recovery plan.

## Development roadmap

### Phase 1 — Foundation

- Define customer and restaurant-owner requirements.
- Create React and Express projects.
- Design MongoDB schemas.
- Establish Git and GitHub source control.

### Phase 2 — Customer experience

- Build the landing page and restaurant search.
- Add registration and login.
- Add restaurant cards and reservation form.
- Add customer booking history.

### Phase 3 — Restaurant operations

- Add restaurant-owner registration.
- Build the owner dashboard.
- Add booking confirmation and rejection.
- Add restaurant metrics.

### Phase 4 — Reviews and reservation charges

- Add city-filtered restaurant reviews.
- Add the ₹50-per-guest charge calculation.
- Add the payment-summary interface.

### Phase 5 — Cloud deployment

- Create the MongoDB Atlas database.
- Deploy the Express backend to Render.
- Deploy the React frontend to Render.
- Configure environment variables, CORS, and SPA rewrites.

### Phase 6 — Production readiness

- Complete the security roadmap.
- Integrate and verify real payments.
- Add testing and continuous integration.
- Add database backups and operational monitoring.
