export function useGetCapital() {
  const getCapitalName = (capital) => {
    if (!capital) return
    return capital[0] == undefined ? '---' : capital[0]
  }

  return { getCapitalName }
}
