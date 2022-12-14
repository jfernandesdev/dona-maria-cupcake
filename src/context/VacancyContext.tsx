import { createContext, ReactNode, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import produce from 'immer'
import Swal from 'sweetalert2'

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
  removeVacancy: (vacancyId: string) => void
  copyVacancy: (vacancyId: string) => void
  resetCopy: () => void
  copiedJobInfo: VacancyData | undefined
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

  const [copiedJobInfo, setCopiedJobInfo] = useState<VacancyData | undefined>({} as VacancyData)
  const navigate = useNavigate()

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

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  })

  function addVacancy(data: VacancyData) {
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

  function removeVacancy(vacancyId: string) {
    Swal.fire({
      title: 'Deseja excluir essa vaga?',
      text: "Essa opção não poderá ser  desfeita",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
         try {
          const updateVacancyList = [...vacancies]
          const vacancyIndex = updateVacancyList.findIndex(
            (vacancy) => vacancy.id === vacancyId
          )
          
          if(vacancyIndex >= 0) {
            updateVacancyList.splice(vacancyIndex, 1)
            setVacancies(updateVacancyList)
            Toast.fire({
              icon: 'success',
              title: 'Vaga excluída com sucesso!'
            })
          } else {
            throw Error()
          }
        } catch {
           Toast.fire({
             icon: 'error',
             title: 'Erro ao tentar excluir essa vaga. Por favor tente novamente.'
           })
        }  
      }
    })
  }

  function copyVacancy(vacancyId: string) {
    const getVacancyList = [...vacancies]
    const vacancyIndex = getVacancyList.findIndex(
      (vacancy) => vacancy.id === vacancyId
    )

    const data = vacancies[vacancyIndex]

    setCopiedJobInfo(data)
    navigate('/nova-vaga') 
  }

  function resetCopy() {
    setCopiedJobInfo(undefined)
  }

  return (
    <VacancyContext.Provider value={{ vacancies, addVacancy, removeVacancy, copyVacancy, copiedJobInfo, resetCopy }}>
      {children}
    </VacancyContext.Provider>
  )
}
