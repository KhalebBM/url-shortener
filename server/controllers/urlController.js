const Url = require("../models/Url");
const generateCode = require("../utils/generateCode");

function normalizeBaseUrl(value) {
  if (!value || typeof value !== "string") {
    return "https://url.svcydigital.my.id";
  }

  return value.trim().replace(/\/+$/, "");
}

const BASE_URL = normalizeBaseUrl(
  process.env.BASE_URL || "https://url.svcydigital.my.id",
);

function isValidUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (err) {
    return false;
  }
}

async function generateUniqueCode() {
  let code;
  let existing = true;

  while (existing) {
    code = generateCode(6);
    existing = await Url.findOne({ shortCode: code });
  }

  return code;
}

async function createShortUrl(req, res) {
  try {
    const { originalUrl } = req.body;

    if (
      !originalUrl ||
      typeof originalUrl !== "string" ||
      !originalUrl.trim()
    ) {
      return res.status(400).json({ error: "A URL is required." });
    }

    const trimmedUrl = originalUrl.trim();

    if (!isValidUrl(trimmedUrl)) {
      return res.status(400).json({
        error: "Please provide a valid URL, including http:// or https://",
      });
    }

    const existingUrl = await Url.findOne({ originalUrl: trimmedUrl });
    if (existingUrl) {
      return res.status(200).json({
        shortCode: existingUrl.shortCode,
        shortUrl: `${BASE_URL}/${existingUrl.shortCode}`,
        originalUrl: existingUrl.originalUrl,
        clicks: existingUrl.clicks,
        createdAt: existingUrl.createdAt,
      });
    }

    const shortCode = await generateUniqueCode();

    const newUrl = await Url.create({
      originalUrl: trimmedUrl,
      shortCode,
    });

    return res.status(201).json({
      shortCode: newUrl.shortCode,
      shortUrl: `${BASE_URL}/${newUrl.shortCode}`,
      originalUrl: newUrl.originalUrl,
      clicks: newUrl.clicks,
      createdAt: newUrl.createdAt,
    });
  } catch (err) {
    console.error("Error creating short URL:", err.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
}

async function getUrlInfo(req, res) {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: "Short URL not found." });
    }

    return res.status(200).json({
      shortCode: url.shortCode,
      shortUrl: `${BASE_URL}/${url.shortCode}`,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
    });
  } catch (err) {
    console.error("Error fetching URL info:", err.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
}

async function redirectToOriginalUrl(req, res) {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res
        .status(404)
        .send("<h1>404</h1><p>This short link does not exist.</p>");
    }

    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error("Error redirecting:", err.message);
    return res.status(500).send("<h1>500</h1><p>Something went wrong.</p>");
  }
}

module.exports = {
  createShortUrl,
  getUrlInfo,
  redirectToOriginalUrl,
  isValidUrl,
  normalizeBaseUrl,
};
