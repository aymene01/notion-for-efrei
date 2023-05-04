import { Options } from '@/business/types'
import { Context } from '@/graphql/context'

type MiddlewareFunc<T, U> = (opts: Options, args: U, ctx: Context) => T

export const protect =
  <T, U>(fn: MiddlewareFunc<T, U>) =>
  async (opts: Options, args: U, ctx: Context) => {
    if (!ctx.userUuid) {
      throw new Error('Unauthorized')
    }
    return fn(opts, args, ctx)
  }
