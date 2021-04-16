import debounce from 'lodash.debounce'
import { useRef } from 'react'

export default function useVerticalScrollDelta(callback, delay = 60) {
  const ref = useRef({
    startScroll: null,
    lastKnownDelta: null,
  })

  // Debounced method to detect the end of scroll.
  const handleEndUpdate = debounce((value) => {
    // Calculate the scroll delta.
    ref.current.lastKnownDelta = value !== null && ref.current.startScroll !== null
      ? value - ref.current.startScroll
      : null

    // Clear the old start value.
    ref.current.startScroll = null

    // Callback with the calculated delta.
    callback(ref.current.lastKnownDelta)
  }, delay)

  // Handler that needs to be set on the scrolling element. It expects
  // a synthetic event object and not the native event object.
  const listener = (event) => {
    const {
      scrollTop,
    } = event?.nativeEvent?.srcElement

    if (!ref.current.startScroll) {
      ref.current.startScroll = scrollTop
    }

    handleEndUpdate(scrollTop)
  }

  return [
    listener,
    ref.current.lastKnownDelta,
  ]
}
