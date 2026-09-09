const express = require('express');
const { createShortUrl, getUrlInfo } = require('../controllers/urlController');

const router = express.Router();

// POST /api/urls - create a new short URL
router.post('/', createShortUrl);

// GET /api/urls/:shortCode - get analytics info for a short URL
router.get('/:shortCode', getUrlInfo);

module.exports = router;
