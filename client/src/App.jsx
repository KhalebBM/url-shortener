import { useState } from 'react';
import axios from 'axios';
import UrlForm from './components/UrlForm.jsx';
import ResultCard from './components/ResultCard.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShorten = async (originalUrl) => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/urls`, { originalUrl });
      setResult(response.data);
    } catch (err) {
      const message =
        err.response?.data?.error || 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="brand">Shortly</div>
        <h1 className="heading">Shorten your links.</h1>
        <p className="subtitle">
          Turn long, messy URLs into clean short links you can share anywhere —
          with click tracking built in.
        </p>

        <UrlForm onShorten={handleShorten} isLoading={isLoading} />

        {error && <div className="error-box">{error}</div>}

        {result && <ResultCard result={result} />}
      </div>

      <footer className="footer">Built with React, Express &amp; MongoDB</footer>
    </div>
  );
}

export default App;
