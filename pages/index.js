import Head from 'next/head'
import Post from '../components/Post/Post'

const post = {
  name: 'Post #0',
  nonce: 'Something is wrong. ',
}

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

      <main className="w-full h-full flex items-center">
        <Post post={post} />
      </main>
    </>
  )
}
