import React from 'react';
import FileUploader from './FileUploader';
import './App.css';

const App = () => {
  return (
    <div>
      <h1>Rarity Calculator</h1>
      <p>
        This tool is designed to be compatible with the Rarity Sniper standard, used by onXRP.com
      </p>
      <p>The JSON file must follow the following format:</p>
      <pre>{`[{name: "NFT name", attributes: [trait_type: "Background", value: "Blue"]}]`}</pre>
      <p>This tool is open source, you can view the github here: xxxxxxxx</p>
      <FileUploader />
    </div>
  );
};

export default App;
