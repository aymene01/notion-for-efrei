import { Post, QueryResolvers } from '@efrei/graphql'
import { Context } from '@/graphql/context'

export const getPost: QueryResolvers<Context>['getPost'] = async (_, args, ctx): Promise<Post> => {
  return ctx.business.getPost(args)
}
