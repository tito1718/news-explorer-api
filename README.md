# NewsExplorer API

REST API for the NewsExplorer full-stack application. It provides authentication, saved-article storage, validation, error handling, logging, and production security.

## Live Links

- API: https://api.tito-wtwr.crabdance.com/news-explorer
- Frontend: https://tito-wtwr.crabdance.com/news-explorer/
- Repository: https://github.com/tito1718/news-explorer-api
- Development branch: `stage-2-backend-api`

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

## API Routes

Protected routes require an authorization header containing `Bearer <token>`.

- `POST /signup`
  - Access: Public
  - Registers a new user

- `POST /signin`
  - Access: Public
  - Signs in a user and returns a JWT

- `GET /users/me`
  - Access: Protected
  - Returns the authenticated user

- `GET /articles`
  - Access: Protected
  - Returns the authenticated user’s saved articles

- `POST /articles`
  - Access: Protected
  - Saves a new article

- `DELETE /articles/:articleId`
  - Access: Protected
  - Deletes an article owned by the authenticated user

For deployed requests, add the route to the production base URL.

Example:

`https://api.tito-wtwr.crabdance.com/news-explorer/signin`

## Request Examples

### Register a User

- Name: `Example User`
- Email: `user@example.com`
- Password: `securepassword`

Example JSON:

    {
      "name": "Example User",
      "email": "user@example.com",
      "password": "securepassword"
    }

### Sign In

Example JSON:

    {
      "email": "user@example.com",
      "password": "securepassword"
    }

### Save an Article

Example JSON:

    {
      "keyword": "technology",
      "title": "Example Article",
      "text": "A short article description.",
      "date": "2026-08-28",
      "source": "Example News",
      "link": "https://example.com/article",
      "image": "https://example.com/image.jpg"
    }

The backend automatically adds the authenticated user’s ID as the article owner.

## Response Status Codes

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

## Available Scripts

- `npm start`
  - Starts the API with Node

- `npm run dev`
  - Starts the API with Nodemon hot reloading

- `npm run lint`
  - Checks the project with ESLint

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

- Passwords are hashed before storage.
- Password hashes are excluded from normal responses.
- JWTs expire after seven days.
- Secrets are stored in an ignored `.env` file.
- Helmet adds protective HTTP headers.
- Rate limiting allows 100 requests per 15-minute window.
- Users retrieve only their own saved articles.
- Users cannot delete another user’s articles.
- Nginx provides HTTPS through Let’s Encrypt.

## Logging

- Normal API activity is stored in `request.log`.
- Server errors are stored in `error.log`.
- Passwords are excluded from logs.
- Request bodies are excluded from logs.
- Authorization headers are excluded from logs.
- Both log files are ignored by Git.

## Production Deployment

The API is deployed on a Google Cloud VM.

Production request flow:

- The client sends an HTTPS request.
- Nginx receives the request.
- Nginx forwards it to the NewsExplorer API on port `3000`.
- The API communicates with MongoDB.
- PM2 keeps the API running after terminal sessions close or the application restarts.

The NewsExplorer backend remains separate from other applications hosted on the same VM.

## Testing

The API was tested for:

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
- Security headers
- Rate limiting
- Request logging
- Error logging
- Local API routes
- Deployed HTTPS routes
- ESLint compliance
- Dependency vulnerabilities
