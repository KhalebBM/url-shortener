import { useState } from 'react';

function UrlForm({ onShorten, isLoading }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    onShorten(inputValue.trim());
  };

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="url-input"
        placeholder="Paste a long URL, e.g. https://github.com/you/project"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isLoading}
        autoFocus
      />
      <button type="submit" className="shorten-btn" disabled={isLoading}>
        {isLoading ? 'Shortening…' : 'Shorten URL'}
      </button>
    </form>
  );
}

export default UrlForm;
