// src/App.js

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [status, setStatus] = useState('');

  const handleClick = async () => {
    setStatus('Changing column title...');
    try {
      // Extract columnId from the URL or pass it as a prop
      // For simplicity, we'll assume it's passed via window.location.search
      const params = new URLSearchParams(window.location.search);
      const columnId = params.get('columnId');
      const boardId = '7060141727'; // Your testing board ID

      if (!columnId) {
        setStatus('Error: columnId not found in URL.');
        return;
      }

      const response = await axios.post('/.netlify/functions/changeColumnTitle', {
        boardId,
        columnId,
      });

      setStatus(`Success: Column title changed to "${response.data.title}"`);
    } catch (error) {
      console.error(error);
      setStatus('Error: Failed to change column title.');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Change Column Title</h2>
      <button onClick={handleClick}>Change to "Hello World!"</button>
      <p>{status}</p>
    </div>
  );
}

export default App;
