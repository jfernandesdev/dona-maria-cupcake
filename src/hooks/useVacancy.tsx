import { useContext } from 'react'
import { VacancyContext, VacancyContextData } from '../context/VacancyContext'

export function useVacancy(): VacancyContextData {
  const context = useContext(VacancyContext)

  return context
}