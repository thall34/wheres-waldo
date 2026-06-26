import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx';
import styles from './styles/selectionBox.module.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)