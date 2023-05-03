import { QueryResolvers } from '@efrei/graphql'
import { Context } from '@/graphql/context'

export const getMe: QueryResolvers<Context>['getMe'] = async (_, args, ctx) => {
  return ctx.business.getMe(args, ctx)
}
