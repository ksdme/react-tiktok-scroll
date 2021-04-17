import get from 'lodash.get'
import { useRef } from 'react'

interface GestureCallbackMeasure {
  delta: number
  speed: number
  direction: 1 | -1
}

type GestureCallback = (
  type: 'moving' | 'end',
  measure: GestureCallbackMeasure,
) => void

export default function useGesture(callback: GestureCallback) {
  const ref = useRef({
    startY: null,
    startedAt: null,
  })

  // Calculate measures from optional intermediate state.
  const calculate = (endY: number , endedAt: number): GestureCallbackMeasure => {
    const delta = ref.current.startY !== null && endY !== null
      ? endY - ref.current.startY
      : null

    const speed = ref.current.startedAt !== null && endedAt !== null && delta !== null
      ? delta / (endedAt - ref.current.startedAt)
      : null

    const direction = delta > 0
      ? -1
      : 1

    return {
      delta,
      speed,
      direction,
    }
  }

  // Return first touch from the event.
  const getTouch = (event: any) => {
    return get(
      event.touches, 0,
      get(event.changedTouches, 0, null),
    )
  }

  // Handler for when the gesture starts.
  const onGestureStart = (event: any) => {
    event.stopPropagation()

    // Get the touch instance
    const touch = getTouch(event)

    if (touch === null) {
      return
    }

    ref.current.startY = touch.screenY
    ref.current.startedAt = event.timeStamp
  }

  // Handler for when the gesture is in progress.
  const onGestureMoving = (event: any) => {
    event.stopPropagation()

    // Get the touch instance
    const touch = getTouch(event)

    if (touch === null) {
      return
    }

    callback(
      'moving',
      calculate(touch.screenY, event.timeStamp),
    )
  }

  // Handler for when the gesture ends.
  const onGestureEnd = (event: any) => {
    event.stopPropagation()

    // Get the touch instance
    const touch = getTouch(event)

    if (touch === null) {
      return
    }

    callback(
      'end',
      calculate(touch.screenY, event.timeStamp),
    )

    ref.current.startY = null
    ref.current.startedAt = null
  }

  return {
    onTouchStart: onGestureStart,
    onMouseDown: onGestureStart,
    onMouseMove: onGestureMoving,
    onTouchMove: onGestureMoving,
    onMouseUp: onGestureEnd,
    onTouchEnd: onGestureEnd,
  }
}
