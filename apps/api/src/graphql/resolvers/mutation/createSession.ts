import { Context } from '@/graphql/context'
import { MutationCreateSessionArgs, MutationResolvers, UserAuthenticated } from '@efrei/graphql'

export const createSession: MutationResolvers<Context>['createSession'] = async (
  _,
  req: MutationCreateSessionArgs,
  ctx,
): Promise<UserAuthenticated> => {
  return ctx.business.createSession(req)
}
