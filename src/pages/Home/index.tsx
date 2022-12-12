import { useVacancy } from "../../hooks/useVacancy"

import { JobCard } from '../../components/JobCard'

import styles from './styles.module.scss'

export function Home () {
  const { vacancies } = useVacancy()

  return (
    <>
      <header>
        <h1>Vagas cadastradas</h1>
        <span>{vacancies.length} vagas</span>
      </header>

      <div className={styles.vacancyList}>
        {vacancies.map((item) => (
          <JobCard key={item.id} vacancy={item} />
        ))}
      </div>
    </>
  )
}