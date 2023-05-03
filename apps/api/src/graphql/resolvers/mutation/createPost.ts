import { MutationResolvers, Post } from '@efrei/graphql'
import { Context } from '@/graphql/context'

export const createPost: MutationResolvers<Context>['createPost'] = async (_, req, ctx): Promise<Post> => {
  return ctx.business.createPost(req, ctx)
}
