import { Options } from '@/business/types'
import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4'
import { JwtPayload } from 'jsonwebtoken'

export type AuthContext = {
  payload?: JwtPayload
}

export const getAuthContext = (opts: Options, ctx: ExpressContextFunctionArgument): AuthContext => {
  const { req } = ctx

  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return {}
  }

  const [, token] = req.headers.authorization.split(' ')

  try {
    const payload = opts.iamService.verifyToken(token) as JwtPayload
    const { id } = payload

    if (!id) return {}

    const user = opts.database.prisma.user.findUnique({
      where: {
        uuid: id,
      },
    })

    if (!user) return {}

    return {
      payload,
    }
  } catch (error) {
    return {}
  }
}
