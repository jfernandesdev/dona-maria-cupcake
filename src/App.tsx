import { VacancyProvider } from './context/VacancyContext'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

import './styles/globals.scss'

export function App() {
  return (
    <BrowserRouter>
      <VacancyProvider>
        <Router />
      </VacancyProvider>
    </BrowserRouter>
  )
}
