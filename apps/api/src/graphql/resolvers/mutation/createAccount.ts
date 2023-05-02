import { MutationResolvers, UserAuthenticated } from '@efrei/graphql'
import { Context } from '@/graphql/context'

export const createAccount: MutationResolvers<Context>['createAccount'] = async (
  _,
  req,
  ctx,
): Promise<UserAuthenticated> => {
  return ctx.business.createAccount(req)
}
