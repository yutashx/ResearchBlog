import PostPreview from './post-preview'
import Post from '../types/post'

type Props = {
  posts: Post[]
  pageTitle: string
}

const MoreStories = ({ posts, pageTitle }: Props) => {
  console.log(`tag error article list: ${posts.map(p => p.tags? "ok": p.title)}`)
  return (
    <section>
      <h2 className="mb-8 text-3xl md:text-3xl font-bold tracking-tighter leading-tight">
        { pageTitle }
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
          />
        ))}
      </div>
    </section>
  )
}

export default MoreStories
