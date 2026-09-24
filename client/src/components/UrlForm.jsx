import { useState } from "react";

function UrlForm({ onShorten, isLoading }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    onShorten(inputValue.trim());
  };

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="long-url">
        Long URL
      </label>
      <div className="input-row">
        <input
          id="long-url"
          type="text"
          className="url-input"
          placeholder="https://example.com/your-very-long-link"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
          autoFocus
        />
        <button type="submit" className="shorten-btn" disabled={isLoading}>
          {isLoading ? "Creating…" : "Create link"}
        </button>
      </div>
    </form>
  );
}

export default UrlForm;
