import { Resolvers } from '@efrei/graphql'
import { hello } from './query'
import { createAccount } from './mutation/createAccount'
import { createSession } from './mutation/createSession'

export const resolvers: Resolvers = {
  Query: {
    hello,
  },
  Mutation: {
    createAccount,
    createSession,
  },
}
