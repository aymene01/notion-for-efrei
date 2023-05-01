import { Resolvers } from '@efrei/graphql'
import { hello } from './query'

export const resolvers: Resolvers = {
	Query: {
		hello,
	},
}
