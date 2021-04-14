import get from 'lodash.get'
import { useState } from 'react'

export default function useScan(items, initial = 0) {
  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(initial)

  const scan = {
    previous: get(items, currentIndex - 1),
    current: get(items, currentIndex),
    next: get(items, currentIndex + 1),
  }

  return [
    currentIndex,
    setCurrentIndex,
    scan,
  ]
}
