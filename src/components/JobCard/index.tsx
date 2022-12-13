import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import { FilePdf, TrashSimple } from 'phosphor-react'

import { PdfExportLayout } from '../../layouts/PdfExportLayout'

import { useVacancy } from '../../hooks/useVacancy'
import { formatPrice } from '../../utils/formatPrice'
import { stringToSlug } from '../../utils/stringToSlug'

import styles from './styles.module.scss'

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
  const { vacancies,removeVacancy } = useVacancy()

  function handleExportPdf(vacancyId: string) {
    try {
      const vacancyIndex = vacancies.findIndex(
        (vacancy) => vacancy.id === vacancyId
      )

      const data = vacancies[vacancyIndex]

      pdf(<PdfExportLayout vacancy={vacancies[vacancyIndex]} />)
        .toBlob()
        .then((blob) => {
          saveAs(blob, `${stringToSlug(data.jobTitle)}.pdf`)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  
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
        <button 
          className={styles.deleteButton}
          onClick={() => removeVacancy(vacancy.id)}
          title="Excluir vaga"
        >
          <TrashSimple size={18} />
        </button>

        <button  
          onClick={() => handleExportPdf(vacancy.id)} 
          className={styles.exportButton}
        >
          <FilePdf size={24} />
          Exportar
        </button>
      </div>
    </div>
  )
}