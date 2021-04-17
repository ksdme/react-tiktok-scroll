import { useSpring, animated } from 'react-spring'
import useGesture from '../../hooks/useGesture'
import useScan from '../../hooks/useScan'
import useWindowSize from '../../hooks/useWindowSize'
import Post from '../Post/Post'

export default function Feed({ posts, initial = 0, }) {
  const [
    currentPostIndex,
    setCurrentPostIndex,
    scan,
  ] = useScan(posts, initial)

  const [
    _,
    height,
  ] = useWindowSize()

  // Set the initial posistion of the view based on the position of
  // the current element in the feed scan.
  const initialY = scan.previous
    ? -height
    : 0

  const [
    animation,
    spring,
  ] = useSpring(() => ({
    top: initialY,
  }))

  // Select next post in scan.
  const nextSelect = () => {
    setCurrentPostIndex(
      currentPostIndex + 1,
    )

    spring.start({
      from: {
        top: -height,
      },
    })
  }

  // Select previous post in scan.
  const previousSelect = () => {
    setCurrentPostIndex(
      currentPostIndex - 1,
    )

    spring.start({
      from: {
        top: currentPostIndex - 1 !== 0
          ? -height
          : 0,
      },
    })
  }

  const gestures = useGesture((type, measure) => {
    if (type === 'moving') {
      return spring.start({
        top: initialY + measure.delta,
      })
    }

    if (type === 'end') {
      // In case of a slow gesture, spring back to the initial position.
      if (measure.delta <= height * 0.75 && Math.abs(measure.speed) < 0.5) {
        return spring.start({
          top: initialY,
        })
      }

      if (measure.direction === 1) {
        return spring.start({
          top: scan.previous
            ? -2 * height
            : -height,
          onRest: nextSelect,
        })
      }

      if (measure.direction === -1) {
        return spring.start({
          top: 0,
          onRest: previousSelect,
        })
      }
    }
  })

  const elements = [
    scan.previous,
    scan.current,
    scan.next,
  ]

  const renderables = elements
    .filter((element) => !!element)

  const renders = renderables.map((renderable) => (
    <Post
      key={renderable.key}
      post={renderable}
    />
  ))

  return (
    <div className="w-screen h-screen overflow-y-hidden" tabIndex="0" {...gestures}>
      <animated.div className="w-screen h-screen relative" style={animation}>
        {renders}
      </animated.div>
    </div>
  )
}
