import { FilePdf } from 'phosphor-react'

import styles from './styles.module.scss'

import { formatPrice } from '../../utils/formatPrice'

interface JobCardProps {
  vacancy: {
    id: string
    jobTitle: string
    experienceRequired: string
    wage: number
    jobActivity: string
    benefits: string[]
    processSteps: string[]
  }
}

export function JobCard( { vacancy }: JobCardProps) {
  
  function amountOfTheRestOfTags(totalAmount: number, quantityShown: number) {
    const hiddenAmount = (totalAmount - quantityShown);

    return (hiddenAmount > 0) ? `+${hiddenAmount}` : 0; 
  }

  const restTags = amountOfTheRestOfTags(vacancy.benefits.length, 3);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{vacancy.jobTitle}</h3>
        <div>
          <div>
            <span>Experiência: {vacancy.experienceRequired}</span>
            <span className={styles.firstProcessStep}>
              Fase: {vacancy.processSteps[0]}
            </span>
          </div>

          <span className={styles.salary}>
            {formatPrice(vacancy.wage)}
          </span>
        </div>
      </div>

      <div className={styles.cardBody}>
        <span>
          {vacancy.jobActivity}
        </span>

        <div className={styles.listBenefits}>
          {vacancy.benefits.slice(0,3).map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}

          {(restTags > 0) && <li>{restTags}</li>}  
        </div>

      </div>

      <div className={styles.cardFooter}>
        <button>
          <FilePdf size={24} />
          Exportar
        </button>
      </div>
    </div>
  )
}