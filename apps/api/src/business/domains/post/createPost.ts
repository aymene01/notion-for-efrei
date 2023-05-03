import { MutationCreatePostArgs, Post } from '@efrei/graphql'
import { Options } from '@/business/types'
import { Context } from '@/graphql/context'

export const createPost = async (opts: Options, req: MutationCreatePostArgs, ctx: Context): Promise<Post> => {
  const user = await opts.database.prisma.user.findUnique({
    where: {
      uuid: ctx.userUuid,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const post = await opts.database.prisma.post.create({
    data: {
      title: req.title,
      content: req.content || '',
      authorUuid: user.uuid,
    },
    include: {
      author: true,
    },
  })

  return post
}
