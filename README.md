# NewsExplorer API

REST API for the NewsExplorer full-stack application. It provides authentication, saved-article storage, validation, error handling, logging, and production security.

## Project links

- **API:** [NewsExplorer API](https://api.tito-wtwr.crabdance.com/news-explorer)
- **Frontend:** [NewsExplorer](https://newsexplorer.pages.dev)
- **Repository:** [news-explorer-api](https://github.com/tito1718/news-explorer-api)
- **Development branch:** `stage-3-integration-api`

## Features

- Secure user registration and sign-in
- Password hashing with bcrypt
- JWT authentication
- Authenticated user retrieval
- Persistent saved-article storage
- User-specific article access
- Article ownership protection
- Request validation with Celebrate and Joi
- Centralized error handling
- Request and error logging
- CORS restrictions for approved frontend origins
- Helmet security headers
- API rate limiting
- MongoDB data storage
- Google Cloud deployment
- Nginx reverse proxy
- PM2 process management
- HTTPS through Let’s Encrypt

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- bcryptjs
- Celebrate and Joi
- Validator
- CORS
- Helmet
- Express Rate Limit
- Winston
- Express Winston
- Nodemon
- ESLint with Airbnb rules
- PM2
- Nginx
- Google Cloud
- Let’s Encrypt

## API routes

Protected routes require an authorization header containing `Bearer <token>`.

### Public routes

- `POST /signup`
  - Registers a new user
- `POST /signin`
  - Signs in a user and returns a JWT

### Protected routes

- `GET /users/me`
  - Returns the authenticated user
- `GET /articles`
  - Returns the authenticated user’s saved articles
- `POST /articles`
  - Saves a new article
- `DELETE /articles/:articleId`
  - Deletes an article owned by the authenticated user

For deployed requests, add the route to the production base URL.

Example:

```text
https://api.tito-wtwr.crabdance.com/news-explorer/signin
```

## Request examples

### Register a user

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Sign in

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Save an article

```json
{
  "keyword": "technology",
  "title": "Example Article",
  "text": "A short article description.",
  "date": "2026-08-28",
  "source": "Example News",
  "link": "https://example.com/article",
  "image": "https://example.com/image.jpg"
}
```

The backend automatically adds the authenticated user’s ID as the article owner.

## Response status codes

- `200` — Request completed successfully
- `201` — Resource created successfully
- `400` — Invalid request data
- `401` — Authentication is missing or invalid
- `403` — User does not own the requested resource
- `404` — Requested resource was not found
- `409` — An account with the submitted email already exists
- `429` — Too many requests
- `500` — Unexpected server error

Unexpected internal errors receive safe public messages. MongoDB, Node.js, and server details are not exposed to clients.

## Run the project locally

### 1. Clone the repository

```bash
git clone https://github.com/tito1718/news-explorer-api.git
cd news-explorer-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
DATABASE_URL=mongodb://127.0.0.1:27017/news-explorer
JWT_SECRET=your_jwt_secret
```

The `.env` file is ignored by Git and must not be committed.

### 4. Start the API

```bash
npm run dev
```

## Available scripts

| Command        | Purpose                                  |
| -------------- | ---------------------------------------- |
| `npm start`    | Start the API with Node                  |
| `npm run dev`  | Start the API with Nodemon hot reloading |
| `npm run lint` | Check the project with ESLint            |

This repository does not currently define an automated `npm test` script.

## Validation

The API validates:

- User names
- Email addresses
- Registration passwords
- Required article fields
- Article URLs
- Image URLs
- MongoDB article IDs
- JWT authorization headers

Invalid requests are rejected before reaching the database.

## Security

- Passwords are hashed before storage
- Password hashes are excluded from normal responses
- JWTs expire after seven days
- Secrets are stored in an ignored `.env` file
- CORS restricts browser requests to approved frontend origins
- Helmet adds protective HTTP headers
- Rate limiting allows 100 requests per 15-minute window
- Users retrieve only their own saved articles
- Users cannot delete articles owned by another user
- Nginx provides HTTPS through Let’s Encrypt

## Logging

- Normal API activity is stored in `request.log`
- Server errors are stored in `error.log`
- Passwords are excluded from logs
- Request bodies are excluded from logs
- Authorization headers are excluded from logs
- Both log files are ignored by Git

## Production deployment

The API is deployed on a Google Cloud VM.

Production request flow:

1. The Cloudflare Pages frontend sends an HTTPS request.
2. Nginx receives the request on the Google Cloud VM.
3. Nginx forwards it to the NewsExplorer API on port `3000`.
4. The API communicates with MongoDB.
5. PM2 keeps the API running after terminal sessions close or the application restarts.

The NewsExplorer backend remains separate from other applications hosted on the same VM.

## Testing

The API was manually tested for:

- Successful and unsuccessful registration
- Successful and unsuccessful sign-in
- Valid, missing, and invalid JWTs
- Current-user retrieval
- Article creation
- Article retrieval
- Article deletion
- Article ownership protection
- Invalid request bodies
- Invalid URLs
- Invalid MongoDB IDs
- Unknown routes
- Centralized error responses
- Approved and unapproved CORS origins
- Security headers
- Rate limiting
- Request logging
- Error logging
- Local API routes
- Deployed HTTPS routes
- ESLint compliance
- Dependency vulnerabilities

## Author

**Cesar "Tito" Chirino**

Software Engineering graduate of the TripleTen program

- [GitHub](https://github.com/tito1718)
- [LinkedIn](https://www.linkedin.com/in/cesar-tito-chirino/)
