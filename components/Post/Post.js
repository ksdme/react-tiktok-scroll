export default function Post({ post }) {
  return (
    <div className="w-screen h-screen flex items-center">
      <div className="p-8">
        <h2 className="font-bold text-xl text-black">
          {post.name}
        </h2>

        <div className="mt-2 text-black max-w-sm">
          By default it adds a set of tap, doubletap, press,
          horizontal pan and swipe, and the multi-touch pinch
          and rotate recognizers. The pinch and rotate recognizers
          are disabled by default because they would make the
          element blocking, but you can enable them by calling:
        </div>
      </div>
    </div>
  )
}
