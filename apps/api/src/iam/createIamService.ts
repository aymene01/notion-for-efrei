import { Options } from './types'
import * as auth from './auth'
import { partial } from 'lodash'

export const createIamService = (opts: Options) => {
  return {
    hashPassword: auth.hashPassword,
    comparePassword: auth.comparePassword,
    generateToken: partial(auth.generateToken, opts),
  }
}

export type IamService = ReturnType<typeof createIamService>
