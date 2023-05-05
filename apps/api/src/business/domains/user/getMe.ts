import { Options } from '@/business/types'
import { Context } from '@/graphql/context'
import { User } from '@efrei/graphql'

export const getMe = async (opts: Options, _args = {}, ctx: Context): Promise<User> => {
  const { userUuid } = ctx

  const user = await opts.database.prisma.user.findUnique({
    where: {
      uuid: userUuid,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  return user
}
