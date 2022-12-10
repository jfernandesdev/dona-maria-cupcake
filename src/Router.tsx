import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'

import { Home } from './pages/Home'
import { NewVacancy } from './pages/NewVacancy'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="nova-vaga" element={<NewVacancy />}/>
      </Route>
    </Routes>
  )
}