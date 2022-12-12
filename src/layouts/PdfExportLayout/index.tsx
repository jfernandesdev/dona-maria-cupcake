import { Document, Page, Text, View, Image } from '@react-pdf/renderer'

import { formatPrice } from '../../utils/formatPrice'

import Logo from '/logo-dona-maria.png'

import { styles } from './styles'

interface VacancyData {
  vacancy: {
    id: string,
    jobTitle: string,
    wage: number,
    benefits: string[],
    processSteps: string[],
    jobActivity: string,
    skills: string,
    experienceRequired: string,
  }
}

export const PdfExportLayout = ({ vacancy }: VacancyData) => (
   <Document>
    <Page size="A4" style={styles.container}> 
      <View style={{ flex: 1 }}>
        <View>
          <View style={styles.center}>
            <Image src={Logo} style={styles.image} />
            <Text style={styles.title}>{vacancy.jobTitle}</Text>
          </View>
          <View style={styles.flex}>
            <Text>
              Experiência necessária: {' '}
              <Text style={styles.label}>{vacancy.experienceRequired}</Text>
            </Text>
            <Text>
              Salário: {' '} 
              <Text style={styles.label}>{formatPrice(vacancy.wage)}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.label}>
            Benefícios:
          </Text>
          <View style={styles.listBenefits}>
            {vacancy.benefits.map((benefit => (
              <Text key={benefit} style={styles.benefitItem}>
                {benefit}
              </Text>
            )))}
          </View>
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.label}>Habilidades necessárias:</Text>
          <Text>{vacancy.skills}</Text>
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.label}>Atividades que o cargo exerce:</Text>
          <Text>{vacancy.jobActivity}</Text>
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.label}>Etapas do processo:</Text>
          {vacancy.processSteps.map((step) => (
            <Text key={step} style={styles.list}>
              {`• ${step}`}
            </Text>
          ))}
        </View>
      </View>

      <View fixed style={styles.footer}>
        <Text>Confeitaria Dona Maria Cupcake</Text>
        <Text render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} />
      </View>
    </Page>
  </Document>
)