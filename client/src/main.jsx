import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient,QueryClientProvider  } from 'react-query'
import App from './App.jsx'
import './index.css'
import { HashRouter as BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
  </QueryClientProvider>


)
