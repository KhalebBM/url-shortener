# URL Shortener

A full-stack URL shortening service with click analytics, built with React, Express, and MongoDB. Paste a long URL, get a short, shareable link, and track how many times it's been clicked.

## Features

- Shorten any valid URL into a compact, unique short code
- Instant redirect from short link to original URL
- Click tracking — every visit increments a counter
- Basic analytics per link: original URL, short URL, click count, creation date
- Duplicate detection — shortening the same URL twice returns the existing short code instead of creating duplicates
- Input validation on both frontend and backend
- Clean 404 handling for unknown short codes
- Dark, modern, responsive UI with copy-to-clipboard support

## Tech Stack

**Frontend:** React, Vite, Axios, plain CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB with Mongoose

## Architecture

```
React (Vite dev server) → Express REST API → MongoDB
```

The React frontend sends requests to the Express API to create short URLs and fetch analytics. Express handles validation, short code generation, and persistence via Mongoose. Visiting a short link hits the Express server directly, which looks up the code in MongoDB, increments the click count, and issues a redirect to the original URL.

## API Endpoints

| Method | Endpoint               | Description                                      |
|--------|------------------------|---------------------------------------------------|
| POST   | `/api/urls`            | Create a short URL. Body: `{ "originalUrl": "https://..." }` |
| GET    | `/api/urls/:shortCode` | Get analytics info for a short URL               |
| GET    | `/:shortCode`          | Redirect to the original URL and increment clicks |

### Example: Create a short URL

**Request**
```json
POST /api/urls
{
  "originalUrl": "https://github.com/KhalebBM/some-project"
}
```

**Response**
```json
{
  "shortCode": "aB72xK",
  "shortUrl": "http://localhost:5000/aB72xK",
  "originalUrl": "https://github.com/KhalebBM/some-project",
  "clicks": 0,
  "createdAt": "2026-09-08T12:00:00.000Z"
}
```

## Installation

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment variables

**Backend** — copy `server/.env.example` to `server/.env` and fill in your values:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/url-shortener
PORT=5000
BASE_URL=http://localhost:5000
```

**Frontend** — copy `client/.env.example` to `client/.env` if you need to point the frontend at a different API URL:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Running the app

You'll need MongoDB running locally (or a MongoDB Atlas connection string in `MONGODB_URI`).

**Terminal 1 — start the backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — start the frontend:**
```bash
cd client
npm run dev
```

Then open the frontend at `http://localhost:5173`.

## Screenshots

_Add screenshots of the app here once deployed, e.g._

```md
![Homepage](./screenshots/homepage.png)
![Result](./screenshots/result.png)
```

## Future Improvements

- Custom aliases for short codes
- Link expiration dates
- User accounts and authentication
- QR code generation for short links
- Advanced analytics (referrers, geolocation, click timelines)

## License

MIT
