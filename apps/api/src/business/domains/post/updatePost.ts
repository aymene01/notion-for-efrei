import { MutationUpdatePostArgs, Post } from '@efrei/graphql'
import { Options } from '@/business/types'
import { Context } from '@/graphql/context'

export const updatePost = async (opts: Options, req: MutationUpdatePostArgs, ctx: Context): Promise<Post> => {
  const user = await opts.database.prisma.user.findUnique({
    where: {
      uuid: ctx.userUuid,
    },
  })

  if (!user) {
    throw new Error('User not found')
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
