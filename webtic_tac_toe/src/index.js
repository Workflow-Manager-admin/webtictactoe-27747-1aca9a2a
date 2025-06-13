import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// If you need to reference PUBLIC_URL in the code, use process.env.PUBLIC_URL safely.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
