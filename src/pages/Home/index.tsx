import { useVacancy } from "../../hooks/useVacancy"

export function Home () {
  const { vacancies } = useVacancy()

  return (
    <>
      <h1>Home</h1>

      <ul>
        {vacancies.map((item) => (
          <li key={item.id}>{item.jobTitle}</li>
        ))}
      </ul>
    </>
  )
}