import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './i18n/i18n.js'
import CustomCursor from './components/CustomCursor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CustomCursor />
      <App />
    </BrowserRouter>
  </StrictMode>
)
