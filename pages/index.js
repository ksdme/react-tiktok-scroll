import Head from 'next/head'
import Feed from '../components/Feed/Feed'

const post = {
  key: 0,
  name: 'Post #0',
  nonce: 'Something is wrong. ',
}

const posts = [
  { ...post, key: 0, name: 'Post #0' },
  { ...post, key: 1, name: 'Post #1' },
  { ...post, key: 2, name: 'Post #2' },
  { ...post, key: 3, name: 'Post #3' },
  { ...post, key: 4, name: 'Post #4' },
]

export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>
          Current Image
        </title>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Overpass:wght@200;300;400;600;700;800;900&display=swap"
        />
      </Head>

      <Feed posts={posts} />
    </>
  )
}
