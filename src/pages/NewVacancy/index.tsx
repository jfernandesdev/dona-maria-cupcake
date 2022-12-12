import { NavLink, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import uuid from 'react-uuid'

import { useVacancy } from '../../hooks/useVacancy'

import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Swal from 'sweetalert2'

import { processStepsOptions } from '../../utils/processStepsOptions'
import { experienceRequiredOptions } from '../../utils/experienceRequiredOptions'
import { benefitsOptions } from '../../utils/benefitsOptions'

import styles from './styles.module.scss'

const newVacancyFormSchema = yup.object({
  jobTitle: yup.string().required(),
  wage: yup.number().required(),
  jobActivity: yup.string().required(),
  benefits: yup.array().of(yup.string().required()).required(),
  processSteps: yup.array().of(yup.string().required()).required(),
  skills: yup.string().required(),
  experienceRequired: yup.string().required(),
})

type NewVacancyFormInputs = yup.InferType<typeof newVacancyFormSchema>

export function NewVacancy () {
  const { addVacancy } = useVacancy()
  const methods = useForm<NewVacancyFormInputs>({
    resolver: yupResolver(newVacancyFormSchema),
    defaultValues: {
      jobTitle: 'Title Job',
      wage: 2000,
      jobActivity: 'Atividade 1; Atividade 2',
      processSteps: ["Inscrição", "Resultado Final"],
      benefits: ['Vale-alimentação'],
      skills: 'Skill 1, Skill 2',
      experienceRequired: 'Sem necessidade'
    }
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = methods;

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  
  async function handleNewVacancy(data: NewVacancyFormInputs) {

    const newVacancy = {
      ...data,
      id: uuid(),
      creationDate: new Date(),
    }
    addVacancy(newVacancy)

    reset()

    Swal.fire({
      title: 'Sucesso!',
      text: 'Vaga cadastrada com sucesso!',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    }).then(() => {
      navigate('/')
    })
  }

  return (
    <div>
      <h1>Cadastro de nova vaga</h1>
      
      <form onSubmit={handleSubmit(handleNewVacancy)} className={styles.form}>
        <label htmlFor="processSteps">
          <span>Selecione as etapas do processo</span>
          <div className={styles.processStepsContainer}>
            {processStepsOptions.map((option) => (
              <div key={option.key} className={styles.inputCheckbox}>
                <input
                  type="checkbox"
                  id={option.key}
                  value={option.value}
                  {...register('processSteps')}
                />
                <label htmlFor={option.key}>
                  {option.value}
                </label>
              </div>
            ))}
          </div>
        </label>
        
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

        <label htmlFor="benefits">
          <span>Benefícios do cargo</span>
          <Controller
            control={control}
            name='benefits'
            render={({ field: { onChange, value, ref } }) => (
              <>
                {console.log(value)}

                <Select
                  ref={ref}
                  value={benefitsOptions.filter(c => value.includes(c.value))}
                  onChange={val => onChange(val.map(c => c.value))}
                  options={benefitsOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder="Digite algo e aperte enter (ou selecione)..."
                  classNamePrefix="select"
                />
              </>
            )}
          />
        </label>

        <div className={styles.flex}>
          <label htmlFor="skills">
            <span>Habilidades necessárias</span>
            <textarea
              id="skills"
              {...register('skills')}
              className={errors.skills ? styles.inputErrorAlert : ''}
            />
          </label>

          <label htmlFor="jobActivity">
            <span>Atividades que o cargo exercerá</span>
            <textarea
              id="jobActivity"
              {...register('jobActivity')}
              className={errors.jobActivity ? styles.inputErrorAlert : ''}
            />
          </label> 
        </div>

        <label htmlFor="experienceRequired">
          <span>Experiência necessária</span>
          <div className={styles.customCheckbox}>
            {experienceRequiredOptions.map((option) => (
              <div key={option.key}>
                <input
                  type="radio"
                  id={option.key}
                  value={option.value}
                  {...register('experienceRequired')}
                />
                <label htmlFor={option.key}>
                  {option.value}
                </label>
              </div>
            ))}
          </div>
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