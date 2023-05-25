export function useGetCapital() {
  const getCapitalName = (capital) => {
    return capital[0] == undefined ? '------' : capital[0]
  }

  return { getCapitalName }
}
