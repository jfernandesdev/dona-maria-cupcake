import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import uuid from 'react-uuid'
import Swal from 'sweetalert2'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { processStepsOptions } from '../../utils/processStepsOptions'

import styles from './styles.module.scss'

const newVacancyFormSchema = yup.object({
  jobTitle: yup.string().required(),
  wage: yup.number().required(),
  jobActivity: yup.string().required(),
  benefits: yup.string().required(),
  processSteps: yup.array().of(yup.string()),
  skills: yup.string().required(),
  experienceRequired: yup.string().required(),
})

type NewVacancyFormInputs = yup.InferType<typeof newVacancyFormSchema>

export function NewVacancy () {
  const { 
    register,  
    handleSubmit,
    reset, 
    formState: { errors, isSubmitting }
  } = useForm<NewVacancyFormInputs>({
    resolver: yupResolver(newVacancyFormSchema),
    defaultValues: {
      jobTitle: 'Title Job',
      wage: 2000,
      jobActivity: 'Atividade 1; Atividade 2',
      benefits: 'Benefício 1; Benefício 2',
      processSteps: ["Inscrição", "Resultado Final"],
      skills: 'Skill 1, Skill 2',
      experienceRequired: 'Experience 1, Experience 2'
    }
  })

  async function handleNewVacancy(data: NewVacancyFormInputs) {
    const { jobTitle, wage, jobActivity, benefits, processSteps, skills, experienceRequired } = data

    const newVacancy = {
      id: uuid(),
      jobTitle,
      wage,
      jobActivity,
      benefits,
      processSteps,
      skills,
      experienceRequired,
      creationDate: new Date(), 
    }

    console.log(newVacancy)

    reset()

    Swal.fire({
      title: 'Sucesso!',
      text: 'Vaga cadastrada com sucesso!',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    })
  }

  return (
    <div>
      <h1>Cadastro de nova vaga</h1>

      <form onSubmit={handleSubmit(handleNewVacancy)} className={styles.form}>
        <div className={styles.inputsInline}>
          <label htmlFor="jobTitle">
            <span>Título do cargo</span>
            <input 
              id="jobTitle" 
              placeholder="Informe o título do cargo"
              {...register('jobTitle')}
              className={errors.jobTitle ? styles.inputErrorAlert : ''}
            />
          </label>

          <label htmlFor="wage">
            <span>Salário</span>
            <div className={`${styles.inputWithPrefix} ${errors.wage ? styles.inputErrorAlert : ''}`}>
              <span>R$</span>
              <input 
                type="number"
                id="wage"
                placeholder="0.00" 
                {...register('wage', { valueAsNumber: true})} 
              />
            </div>
          </label>
        </div>

        <label htmlFor="jobActivity">
          <span>Atividades que o cargo exercerá</span>
          <textarea 
            id="jobActivity" 
            {...register('jobActivity')}
            className={errors.jobActivity ? styles.inputErrorAlert : ''}
          /> 
        </label>

        <label htmlFor="benefits">
          <span>Benefícios do cargo</span>
          <textarea
            id="benefits" 
            {...register('benefits')}
            className={errors.benefits ? styles.inputErrorAlert : ''}
          />
        </label>

        <label htmlFor="processSteps">
          <span>Selecione as etapas do processo</span>  
          <div className={styles.processStepsContainer}>
            {processStepsOptions.map((option) => (
              <div key={option.id} className={styles.inputCheckbox}>
                <input
                  type="checkbox"
                  id={option.id}
                  value={option.stepName}
                  {...register('processSteps')}
                />
                <label htmlFor={option.id}>
                  {option.stepName}
                </label>
              </div>
            ))}
          </div>
        </label>

        <label htmlFor="skills">
          <span>Habilidades necessárias</span>
          <textarea 
            id="skills" 
            {...register('skills')}
            className={errors.skills ? styles.inputErrorAlert : ''}
          />
        </label>

        <label htmlFor="experienceRequired">
          <span>Experiência necessária</span>
          <textarea 
            id="experienceRequired"
            {...register('experienceRequired')} 
            className={errors.experienceRequired ? styles.inputErrorAlert : ''}
          />
        </label>

        <footer>
          <NavLink to="/">
            <button type="reset">
              Cancelar
            </button>
          </NavLink>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar nova vaga'}
          </button>
        </footer>
      </form>
    </div>
  )
}