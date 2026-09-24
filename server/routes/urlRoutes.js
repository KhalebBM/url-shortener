const express = require("express");
const { createShortUrl, getUrlInfo } = require("../controllers/urlController");

const router = express.Router();

router.post("/", createShortUrl);
router.get("/:shortCode", getUrlInfo);

module.exports = router;
