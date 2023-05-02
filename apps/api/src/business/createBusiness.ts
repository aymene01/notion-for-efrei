import { Options } from './types'
import { partial } from 'lodash'
import { createAccount } from './domains/auth/createAccount'
import { createSession } from './domains/auth/createSession'

export const createBusiness = (opts: Options) => {
  return {
    createAccount: partial(createAccount, opts),
    createSession: partial(createSession, opts),
  }
}

export type Business = ReturnType<typeof createBusiness>
