import { Business } from '@/business/createBusiness'
import { Options } from './types'
import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4'

export type Context = {
  business: Business
}

export const createContext = async (opts: Options, req: ExpressContextFunctionArgument): Promise<Context> => {
  const { business } = opts
  return {
    business,
  }
}
