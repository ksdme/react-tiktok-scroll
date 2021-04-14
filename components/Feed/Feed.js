import useScan from '../../hooks/useScan'
import Post from '../Post/Post'

export default function Feed({ posts, initial = 0, }) {
  const [
    currentPostIndex,
    setCurrentPostIndex,
    scan,
  ] = useScan(posts, initial)

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
    <div className="h-screen overflow-y-scroll">
      {renders}
    </div>
  )
}
