import { Link, useParams } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { selectPostById } from '@/features/posts/postsSlice'
import { PostAuthor } from '@/features/posts/PostAuthor'
import { ReactionButtons } from '@/features/posts/ReactionButtons'

export const SinglePostPage = () => {
  const { postId } = useParams()
  const post = useAppSelector(state => selectPostById(state, postId!))


  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user} />
        <ReactionButtons post={post}/>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}