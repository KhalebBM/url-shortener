import { useState } from "react";

function formatDate(dateString) {
  if (!dateString) return "—";

  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="result-card">
      <div className="result-row">
        <span className="result-label">Short link</span>
        <div className="short-url-row">
          <a
            href={result.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="short-url-link"
          >
            {result.shortUrl}
          </a>
          <button type="button" className="copy-btn" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="result-row">
        <span className="result-label">Original</span>
        <p className="original-url">{result.originalUrl}</p>
      </div>

      <div className="stats-row">
        <div className="stat">
          <span className="stat-value">{result.clicks ?? 0}</span>
          <span className="stat-label">Clicks</span>
        </div>
        <div className="stat">
          <span className="stat-value">{formatDate(result.createdAt)}</span>
          <span className="stat-label">Created</span>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
