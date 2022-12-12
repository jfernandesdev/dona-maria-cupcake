export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  // minimumFractionDigits: 2,
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})