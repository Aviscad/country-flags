export function useFormatNum() {
  const formatNum = (num) => {
    let n
    try {
      n = Number(num)
    } catch (error) {
      return num
    }

    return Intl.NumberFormat('es-SV').format(n)
  }

  return { formatNum }
}
