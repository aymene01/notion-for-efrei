import { Options } from '@/business/types'
import { Context } from '@/graphql/context'
import { Post } from '@efrei/graphql'

export const getAllPosts = async (opts: Options, _args = {}, ctx: Context): Promise<Post[]> => {
  const posts = await opts.database.prisma.post.findMany({
    where: {
      authorUuid: ctx.userUuid,
    },
    include: {
      author: true,
    },
  })

  return posts
}
