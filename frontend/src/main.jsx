import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext'; // for cart sidebar toggle

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
