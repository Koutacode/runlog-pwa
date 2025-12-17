import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

// Mount the root component into the DOM. The strict mode helps catch
// unexpected side effects during development. Production builds omit it.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);