export const moveItem = <T>(array: T[], from: number, to: number) => {
  const startIndex = to < 0 ? array.length + to : to
  const item = array.splice(from, 1)[0]
  array.splice(startIndex, 0, item)

  // console.log(array)
  // console.log(from, to, startIndex)
  // console.log(item)
  // console.log(array)

  return array
}
