import { Context } from '@/graphql/context'
import { MutationResolvers, Post } from '@efrei/graphql'

export const updatePost: MutationResolvers<Context>['updatePost'] = async (_, args, ctx): Promise<Post> => {
  return ctx.business.updatePost(args, ctx)
}
