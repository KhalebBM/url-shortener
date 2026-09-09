require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const urlRoutes = require('./routes/urlRoutes');
const { redirectToOriginalUrl } = require('./controllers/urlController');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/url-shortener";

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/urls', urlRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Redirect route - must come after /api routes so it doesn't shadow them
app.get('/:shortCode', redirectToOriginalUrl);

// Fallback 404 for anything else (e.g. unknown /api/* routes)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Global error handler (safety net so the server never crashes on unexpected errors)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
