import { Resolvers } from '@efrei/graphql'
import { hello } from './query'
import { createAccount } from './mutation/createAccount'
import { createSession } from './mutation/createSession'
import { createPost } from './mutation/createPost'
import { deletePost } from './mutation/deletePost'
import { getPost } from './query/getPost'
import { getAllPosts } from './query/getAllPosts'

export const resolvers: Resolvers = {
  Query: {
    hello,
    getPost,
    getAllPosts,
  },
  Mutation: {
    createAccount,
    createSession,
    createPost,
    deletePost,
  },
}
