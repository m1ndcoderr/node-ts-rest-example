export const getIdFromUrl = (url: string): number => {
  const arr = url.split('?')[0].split('/')
  return Number(arr[arr.length - 1])
}
