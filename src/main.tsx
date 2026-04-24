import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { ContactModalProvider } from './components/ContactModalProvider'
import { LeadFormModal } from './components/LeadFormModal'
import { ContactOptionsModal } from './components/ContactOptionsModal'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ContactModalProvider>
      <App />
      <LeadFormModal />
      <ContactOptionsModal />
    </ContactModalProvider>
  </BrowserRouter>,
)
