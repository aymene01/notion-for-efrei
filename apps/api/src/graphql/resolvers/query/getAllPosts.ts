import { Context } from '@/graphql/context'
import { QueryResolvers } from '@efrei/graphql'

export const getAllPosts: QueryResolvers<Context>['getAllPosts'] = async (_, args, ctx) => {
  return ctx.business.getAllPosts(args)
}
