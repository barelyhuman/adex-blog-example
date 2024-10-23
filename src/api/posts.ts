import { IncomingMessage, ServerResponse } from 'adex/http'
import { db } from '../lib/db.js'

export default async function (req: IncomingMessage, res: ServerResponse) {
  if (
    !['POST', 'GET'].some(d => d.toLowerCase() === req.method.toLowerCase())
  ) {
    res.statusCode = 404
    res.end()
    return
  }
  if (req.method.toLowerCase() === 'post') {
    return createPost(req, res)
  }
  if (req.method.toLowerCase() === 'get') {
    return getAllPosts(req, res)
  }
}

async function createPost(req: IncomingMessage, res: ServerResponse) {
  const data = await req.parseBodyJSON()
  const userDetails = await createFakeUser()
  const postDetails = await db('posts').insert(
    {
      title: data.title,
      content: data.content,
      author_id: userDetails.id,
    },
    'id'
  )
  return res.json(postDetails)
}

async function getAllPosts(_req: IncomingMessage, res: ServerResponse) {
  return res.json(await db('posts'))
}

async function createFakeUser() {
  const userExists = await db('users')
    .where({
      name: 'reaper',
    })
    .first()
  if (!userExists) {
    return (
      await db('users').insert(
        {
          name: 'reaper',
        },
        '*'
      )
    )[0]
  }
  return userExists
}
