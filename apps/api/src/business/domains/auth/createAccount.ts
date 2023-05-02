import { Options } from '@/business/types'
import { MutationCreateAccountArgs, UserAuthenticated } from '@efrei/graphql'

export const createAccount = async (opts: Options, req: MutationCreateAccountArgs): Promise<UserAuthenticated> => {
  const userExist = await opts.database.prisma.user.findUnique({
    where: {
      email: req.email,
    },
  })

  if (userExist) {
    throw new Error('User already exist')
  }

  const encryptedPassword = await opts.iamService.hashPassword(req.password)

  const user = await opts.database.prisma.user.create({
    data: {
      email: req.email,
      password: encryptedPassword,
      name: req.name,
    },
  })

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
