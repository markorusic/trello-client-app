import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/auth-provider'
import { queryClient } from './config/query-client'
import { initI18n } from './config/i18n'
import App from './App'
import './index.css'

initI18n()

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
