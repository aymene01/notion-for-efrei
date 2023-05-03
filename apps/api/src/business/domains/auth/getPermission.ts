import { Options } from '@/business/types'

export const getPermissions = (opts: Options) => {
  return opts.iamService.getPermissions()
}
