import { Options } from '@/business/types'
import { MutationDeletePostArgs, Post } from '@efrei/graphql'

export const deletePost = async (opts: Options, req: MutationDeletePostArgs): Promise<Post> => {
  const postToDelete = await opts.database.prisma.post.findUnique({
    where: {
      uuid: req.uuid,
    },
  })

  if (!postToDelete) {
    throw new Error('Post not found')
  }

  const post = await opts.database.prisma.post.delete({
    where: {
      uuid: req.uuid,
    },
    include: {
      author: true,
    },
  })

  return post
}
