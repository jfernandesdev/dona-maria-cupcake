import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MagnifyingGlass, PlusCircle, ScribbleLoop } from 'phosphor-react'

import { useVacancy } from '../../hooks/useVacancy'

import { JobCard } from '../../components/JobCard'

import styles from './styles.module.scss'

export function Home () {
  const { vacancies } = useVacancy()
  const [search, setSearch] = useState('')
 
  const filteredVacancy = vacancies.filter(
    ({ jobTitle }) => 
      jobTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1>Vagas cadastradas</h1>
          <span>{(vacancies.length > 1) && `${vacancies.length} vagas`}</span>
        </div>

        <div className={styles.optionsHeader}>
          <label htmlFor="search" className={styles.inputSearch}>
            <MagnifyingGlass size={18} />
            <input 
              type="search"
              id="search"
              name="search"
              placeholder="Buscar vaga..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoComplete="off"
            />
          </label>

          <NavLink to="/nova-vaga">
            <button>
              Nova vaga
              <PlusCircle size={16} weight="fill" />
            </button>
          </NavLink>
        </div>
      </header>

      {(filteredVacancy.length > 0) ? (
        <div className={styles.vacancyList}>
          {filteredVacancy.map((item) => (
            <JobCard key={item.id} vacancy={item} />
          )).reverse()}
        </div>
      ) : (
        <div className={styles.noVacancy}>
          <ScribbleLoop size={32} />
          <span>Nenhuma vaga a mostrar!</span>
        </div>
      )}
    </>
  )
}