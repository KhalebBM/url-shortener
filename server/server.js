require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const urlRoutes = require("./routes/urlRoutes");
const { redirectToOriginalUrl } = require("./controllers/urlController");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/url-shortener";

app.use(cors());
app.use(express.json());

app.use("/api/urls", urlRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/:shortCode", redirectToOriginalUrl);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error." });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
