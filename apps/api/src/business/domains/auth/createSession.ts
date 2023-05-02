import { Options } from '@/business/types'
import { MutationCreateSessionArgs, UserAuthenticated } from '@efrei/graphql'

export const createSession = async (opts: Options, req: MutationCreateSessionArgs): Promise<UserAuthenticated> => {
  const user = await opts.database.prisma.user.findUnique({
    where: {
      email: req.email,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const passwordMatch = await opts.iamService.comparePassword(req.password, user.password)

  if (!passwordMatch) {
    throw new Error('Invalid password')
  }

  const payload = {
    id: user.uuid,
    email: user.email,
  }

  const token = opts.iamService.generateToken(payload)

  return {
    user,
    meta: {
      token,
    },
  }
}
