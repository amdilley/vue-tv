/**
 * Inserts item into array already
 * sorted in descending order
 */
export const sortedInsert = <T = any>(
  item: T,
  sorted: T[],
  // returns -1 if a is less than b
  // returns 1 if a is greater than b
  // returns 0 if a equals b
  comparator: (a: T, b: T) => -1 | 0 | 1,
): T[] => {
  const len = sorted.length

  if (len === 0) {
    return [item]
  }

  let l = 0
  let r = len - 1

  while (l <= r) {
    const m = Math.floor((l + r) / 2)
    const midVal = sorted[m]
    const compareVal = comparator(item, midVal)

    if (compareVal === 1) {
      if (l === m) {
        sorted.splice(l, 1, item, sorted[l])
        return sorted
      }

      r = m - 1
    } else if (compareVal === -1) {
      if (r === m) {
        sorted.splice(r + 1, 0, item)
        return sorted
      }

      l = m + 1
    } else {
      sorted.splice(m, 0, item)
      return sorted
    }
  }

  return sorted
}
