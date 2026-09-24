import { useState } from "react";
import axios from "axios";
import UrlForm from "./components/UrlForm.jsx";
import ResultCard from "./components/ResultCard.jsx";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const PUBLIC_DOMAIN = "https://url.svcydigital.my.id";

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async (originalUrl) => {
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/urls`, {
        originalUrl,
      });
      setResult(response.data);
    } catch (err) {
      const message =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="app-card">
        <header className="topbar">
          <div className="brand-wrap">
            <span className="brand-mark">url</span>
            <span className="brand-name">svcydigital</span>
          </div>
          <span className="domain-tag">{PUBLIC_DOMAIN}</span>
        </header>

        <div className="hero-copy">
          <p className="eyebrow">short links, cleaner sharing</p>
          <h1>Turn long links into something easy to remember.</h1>
          <p className="subtitle">
            Shorten anything you share, track engagement, and keep your links
            tidy for clients, campaigns, and everyday sharing.
          </p>
        </div>

        <UrlForm onShorten={handleShorten} isLoading={isLoading} />

        {error && <div className="error-box">{error}</div>}
        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}

export default App;
