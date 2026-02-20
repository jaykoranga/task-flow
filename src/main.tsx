import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/global.css'
import App from './app/App'
import { ThemeProvider } from './context/ThemeContext'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  </StrictMode>,
)
