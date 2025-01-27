import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageData, setImageData] = useState(null);

  const handleGenerate = async () => {
    // Make POST request to Django backend
    const response = await fetch("http://127.0.0.1:8000/api/generate-image/", {
      method: "POST",
      body: new URLSearchParams({ prompt }), 
    });

    if (response.ok) {
      const data = await response.json();
      setImageData(data.image);  // base64 string
    } else {
      console.error("Error generating image.");
    }
  };

  return (
    <div className="app-container">
      <h1>Image Generator WebApp</h1>
      <h2>using Stable Diffusion</h2>
      <div>
        <input
          type="text"
          className="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button className="generate-button" onClick={handleGenerate}>
          Generate
        </button>
      </div>

      {imageData && (
        <div className="image-preview">
          <img
            className="generated-image"
            src={`data:image/png;base64,${imageData}`}
            alt="Generated"
          />
          <br />
          <a
            className="download-link"
            href={`data:image/png;base64,${imageData}`}
            download="generated_image.png"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
