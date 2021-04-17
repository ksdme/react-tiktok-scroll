import { useState, useEffect } from 'react'

// Returns the current window size.
export default function useWindowSize() {
  const [
    size,
    setSize,
  ] = useState({
    width: null,
    height: null,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const onResizeWindow = () => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      // Bootstrap
      onResizeWindow()

      // Add listener for resize.
      window.addEventListener(
        'resize',
        onResizeWindow,
      )

      // Remove listener on tear down.
      return () => window.removeEventListener(
        'resize',
        onResizeWindow,
      )
    }
  }, [])

  return [
    size.width,
    size.height,
  ]
}
