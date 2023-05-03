import { rule } from 'graphql-shield'
import { Context } from '@/graphql/context'
import { not, shield } from 'graphql-shield'

const isAuthenticated = rule()(async (_, __, ctx: Context) => {
  return ctx.userUuid !== undefined
})

const permission: any = shield({
  Query: {
    '*': isAuthenticated,
  },
  Mutation: {
    createSession: not(isAuthenticated),
    createAccount: not(isAuthenticated),
    '*': isAuthenticated,
  },
})

export const getPermissions = () => permission
