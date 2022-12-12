import { createContext, ReactNode, useState, useEffect, useRef } from 'react'
import produce from 'immer'

interface VacancyData {
  id: string,
  jobTitle: string,
  wage: number,
  benefits: string[],
  processSteps: string[],
  jobActivity: string,
  skills: string,
  experienceRequired: string,
  creationDate: Date,
}

interface VacancyProviderProps {
  children: ReactNode
}

export interface VacancyContextData {
  vacancies: VacancyData[]
  addVacancy: (data: VacancyData) => void
}

export const VacancyContext = createContext<VacancyContextData>({} as VacancyContextData)

export function VacancyProvider({ children }: VacancyProviderProps) {
  const [vacancies, setVacancies] = useState<VacancyData[]>(() => {
    const storageVacancy = localStorage.getItem('@DonaMariaCupcake:vacancy')

    if(storageVacancy) {
      return JSON.parse(storageVacancy)
    }

    return []
  })

  const prevVacancyRef = useRef<VacancyData[]>()

  useEffect(() => {
    prevVacancyRef.current = vacancies
  })

  const vacancyPreviousValue = prevVacancyRef.current ?? vacancies

  useEffect(() => {
    if (vacancyPreviousValue !== vacancies) {
      localStorage.setItem('@DonaMariaCupcake:vacancy', JSON.stringify(vacancies))
    }
  }, [vacancies, vacancyPreviousValue])

  async function addVacancy(data: VacancyData) {
    try {
      const newVacancy = {
        ...data,
        creationDate: new Date(),
      }

      const vacancyList = produce(vacancies, (draft) => {
        draft.push(newVacancy)
      })
      
      setVacancies(vacancyList)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <VacancyContext.Provider value={{ vacancies, addVacancy }}>
      {children}
    </VacancyContext.Provider>
  )
}
