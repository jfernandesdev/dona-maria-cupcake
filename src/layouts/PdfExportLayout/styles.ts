import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    padding: 50,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'black',
    color: '#1F2937',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1F2937',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1, 
  },
  wrapper: {
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'column',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,  
  },
  listBenefits: {
    display: 'flex',
    flexDirection: 'row', 
    flexWrap: 'wrap',
    fontSize: 9,
  },
  benefitItem: {
    borderWidth: 1,
    borderColor: '#6A4BFF',
    color: '#6A4BFF',
    backgroundColor: '#D7D1FC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    marginVertical: 3,
    marginHorizontal: 3,
  },
  list: {
    marginBottom: 5,
    marginTop: 5,
    marginRight: 10,
    color: '#000',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    color: '#9CA3AF',
    fontSize: 10,
  },
})