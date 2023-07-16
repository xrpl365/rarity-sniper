import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { RarityCalculator } from './RarityCalculator';
import './fileUploader.css';

const FileUploader = () => {
  const [rarityScores, setRarityScores] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const parsedJson = JSON.parse(content);
      setRarityScores(RarityCalculator(parsedJson));
    };

    reader.readAsText(file);
  };

  const handleDownload = () => {
    // Create a new Blob with the JSON string
    const blob = new Blob([JSON.stringify(rarityScores)], { type: 'application/json' });

    // Save the Blob as a file using FileSaver.js
    saveAs(blob, 'rarity.json');
  };

  return (
    <>
      <div>
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
        />
      </div>
      {rarityScores && (
        <>
          <hr />
          <h3>Rarity.JSON</h3>
          <button
            disabled={!rarityScores}
            onClick={handleDownload}
          >
            Download
          </button>
          <div className="json-output">{rarityScores && JSON.stringify(rarityScores, null, 2)}</div>
        </>
      )}
    </>
  );
};

export default FileUploader;
