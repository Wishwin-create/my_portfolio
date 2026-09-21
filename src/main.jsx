import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import profilePhoto from './assets/my_photo.png';

const favicon = document.querySelector('link[rel="icon"]');
favicon.href = profilePhoto;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
