import { Hello, QueryResolvers } from '@efrei/graphql'

export const hello: QueryResolvers['hello'] = (): Hello => ({
  message: 'Hello World',
})
