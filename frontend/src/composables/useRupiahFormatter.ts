export function useRupiahFormatter() {
  const formatInput = (value: string | number): string => {
    if (!value && value !== 0) return ''
    const num = typeof value === 'string' ? parseInt(value.replace(/\D/g, '')) || 0 : value
    return num.toLocaleString('id-ID')
  }

  const parseInput = (display: string): number => {
    if (!display) return 0
    return parseInt(display.replace(/\D/g, '')) || 0
  }

  return { formatInput, parseInput }
}
