import { Options } from './types'
import * as auth from './auth'
import { partial } from 'lodash'
import { protect } from './protect'

export const createIamService = (opts: Options) => {
  return {
    hashPassword: auth.hashPassword,
    comparePassword: auth.comparePassword,
    generateToken: partial(auth.generateToken, opts),
    verifyToken: partial(auth.verifyToken, opts),
    protect,
  }
}

export type IamService = ReturnType<typeof createIamService>
