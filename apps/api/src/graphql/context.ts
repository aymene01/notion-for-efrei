import { Business } from '@/business/createBusiness'
import { Options } from './types'
import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4'
import { isEmpty } from 'lodash'

export type Context = {
  business: Business
  userUuid?: string
}

export const createContext = async (opts: Options, req: ExpressContextFunctionArgument): Promise<Context> => {
  const { business } = opts

  const authContext: Context = {
    business,
  }

  const { user } = business.getAuthContext(req)

  if (!isEmpty(user)) {
    const { id } = user
    authContext['userUuid'] = id
  }

  return authContext
}
