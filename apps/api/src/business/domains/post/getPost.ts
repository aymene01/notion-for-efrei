import { Options } from '@/business/types'
import { QueryGetPostArgs, Post } from '@efrei/graphql'

export const getPost = async (opts: Options, req: QueryGetPostArgs): Promise<Post> => {
  const post = await opts.database.prisma.post.findUnique({
    where: {
      uuid: req.uuid,
    },
    include: {
      author: true,
    },
  })

  if (!post) {
    throw new Error('Post not found')
  }

  return post
}
