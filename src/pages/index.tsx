import { NewPostForm } from '../components/NewPostForm.js'
import { PostsList } from '../components/PostList.js'

export default function () {
  return (
    <main>
      <h1>Blog</h1>
      <NewPostForm />
      <PostsList />
    </main>
  )
}
