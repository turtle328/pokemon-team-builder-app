import React from 'react';
import ReactDOM from 'react-dom';
import SnackbarProvider from 'react-simple-snackbar';
import './index.css';
import App from './App';

ReactDOM.render(
  <SnackbarProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SnackbarProvider>,
  document.getElementById('root')
);
