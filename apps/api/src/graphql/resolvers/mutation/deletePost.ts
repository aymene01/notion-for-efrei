import { MutationResolvers } from '@efrei/graphql'
import { Context } from '@/graphql/context'

export const deletePost: MutationResolvers<Context>['deletePost'] = async (_, args, ctx) => {
  return ctx.business.deletePost(args, ctx)
}
