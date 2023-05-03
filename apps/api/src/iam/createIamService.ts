import { Options } from './types'
import * as auth from './auth'
import { partial } from 'lodash'
import { getPermissions } from './middleware'

export const createIamService = (opts: Options) => {
  return {
    hashPassword: auth.hashPassword,
    comparePassword: auth.comparePassword,
    generateToken: partial(auth.generateToken, opts),
    verifyToken: partial(auth.verifyToken, opts),
    getPermissions,
  }
}

export type IamService = ReturnType<typeof createIamService>
