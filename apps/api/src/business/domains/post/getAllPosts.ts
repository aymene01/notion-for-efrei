import { Options } from '@/business/types'
import { QueryGetAllPostsArgs, Post } from '@efrei/graphql'

export const getAllPosts = async (opts: Options, req: QueryGetAllPostsArgs): Promise<Post[]> => {
  const posts = await opts.database.prisma.post.findMany({
    where: {
      authorUuid: req.authorUuid,
    },
    include: {
      author: true,
    },
  })

  return posts
}
