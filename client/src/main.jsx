import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner'
// import Cookies from 'universal-cookie';
import './index.css'

// export const cookies = new Cookies(); // Initialize cookies

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
    <Toaster />
    {/* <Toaster richColors /> */}
  </BrowserRouter>
  // </React.StrictMode>
);