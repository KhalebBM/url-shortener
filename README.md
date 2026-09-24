# URL Shortener

A simple URL shortener built with React, Express, and MongoDB. It turns long links into short shareable URLs, keeps click counts, and redirects visitors to the original destination.

This project is designed to be local-first during development, and it can be pointed at a production domain such as `https://url.svcydigital.my.id` when you deploy it.

## What it does

- Shortens long URLs into a compact code
- Redirects short links to their original destination
- Tracks click counts per shortened link
- Reuses the same shortened link if the same URL is submitted again
- Validates input before saving the link
- Provides a clean frontend for creating and copying short links

## Tech stack

- Frontend: React + Vite
- API: Node.js + Express
- Database: MongoDB + Mongoose
- Styling: plain CSS

## Project structure

```text
url-shortener/
├── client/              # React frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── server/              # Express API and MongoDB logic
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── .gitignore
├── package.json         # root scripts for running the app
├── README.md
└── package-lock.json
```

## Quick start

### 1) Install dependencies

From the project root:

```bash
npm install
```

Then install the backend and frontend packages:

```bash
npm --prefix server install
npm --prefix client install
```

### 2) Start MongoDB locally

Make sure MongoDB is running on your machine.

The app expects a local database at:

```env
mongodb://127.0.0.1:27017/url-shortener
```

### 3) Start the app

From the project root:

```bash
npm run dev
```

This runs the backend in the server folder using the project root script.

### 4) Open the app

Open the frontend in your browser:

```text
http://localhost:5173
```

## Environment variables

Use the backend environment file in the server folder:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/url-shortener
PORT=5000
BASE_URL=http://localhost:5000
```

For production, update it to your domain, for example:

```env
BASE_URL=https://url.svcydigital.my.id
```

The frontend can also point to the API through:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## API endpoints

### Create a short URL

```http
POST /api/urls
Content-Type: application/json
```

Body:

```json
{
  "originalUrl": "https://example.com/very/long/url"
}
```

Response:

```json
{
  "shortCode": "AbCd12",
  "shortUrl": "http://localhost:5000/AbCd12",
  "originalUrl": "https://example.com/very/long/url",
  "clicks": 0,
  "createdAt": "2026-09-24T00:00:00.000Z"
}
```

### Get short link info

```http
GET /api/urls/:shortCode
```

### Redirect a short link

```http
GET /:shortCode
```

This route looks up the code in MongoDB, increments the click count, and redirects to the original URL.

## Notes for deployment

This app is set up to work locally first, and it can be deployed with a public hostname such as:

```text
https://url.svcydigital.my.id
```

When deploying, make sure:

- the backend is reachable on the correct host
- `BASE_URL` matches your production domain
- MongoDB is available in the deployed environment
- the tunnel or reverse proxy forwards requests to port 5000

## License

This project is for personal or small project use. No formal license has been attached unless you decide to add one later.
