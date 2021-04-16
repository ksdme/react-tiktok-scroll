import get from 'lodash.get'
import { useRef } from 'react'

interface GestureCallbackMeasure {
  delta: number
  speed: number
}

type GestureCallback = (
  type: 'moving' | 'end',
  measure: GestureCallbackMeasure,
) => void

export default function useGesture(callback: GestureCallback) {
  const ref = useRef({
    startY: null,
    startedAt: null,
    endY: null,
    endedAt: null,
  })

  // Calculate measures from optional intermediate state.
  const calculate = (endY = null, endedAt = null) => {
    if (endY === null) {
      endY = ref.current.endY
    }

    if (endedAt === null) {
      endedAt = ref.current.endedAt
    }

    const delta = ref.current.startY !== null && endY !== null
      ? endY - ref.current.startY
      : null

    const speed = ref.current.startedAt !== null && endedAt !== null && delta !== null
      ? (endedAt - ref.current.startedAt) / delta
      : null

    return {
      delta,
      speed,
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
    const touch = getTouch(event)

    if (touch === null) {
      return
    }

    ref.current.startY = touch.screenY
    ref.current.startedAt = event.timeStamp
  }

  // Handler for when the gesture is in progress.
  const onGestureMoving = (event: any) => {
    const touch = getTouch(event)

    if (touch === null) {
      return
    }

    callback(
      'moving',
      calculate(touch.screenY, touch.timeStamp),
    )
  }

  // Handler for when the gesture ends.
  const onGestureEnd = (event: any) => {
    const touch = getTouch(event)

    if (touch === null) {
      return
    }

    ref.current.endY = touch.screenY
    ref.current.endedAt = event.timeStamp

    callback(
      'end',
      calculate(),
    )
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
