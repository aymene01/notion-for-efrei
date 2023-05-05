import { MutationUpdatePostArgs, Post } from '@efrei/graphql'
import { Options } from '@/business/types'
import { Context } from '@/graphql/context'

export const updatePost = async (opts: Options, req: MutationUpdatePostArgs, _ctx: Context): Promise<Post> => {
  const postToUpdate = await opts.database.prisma.post.findUnique({
    where: {
      uuid: req.uuid,
    },
  })

  if (!postToUpdate) {
    throw new Error('Post not found')
  }

  const post = await opts.database.prisma.post.update({
    where: {
      uuid: req.uuid,
    },
    data: {
      title: req.title || '',
      content: req.content || '',
    },
  })

  return post
}
