import { Options } from '@/business/types'
import { Context } from '@/graphql/context'

export const protect =
  <T, U>(fn: (opts: Options, args: U, ctx: Context) => T) =>
  async (opts: Options, args: U, ctx: Context) => {
    if (!ctx.userUuid) {
      throw new Error('Unauthorized')
    }
    return fn(opts, args, ctx)
  }
