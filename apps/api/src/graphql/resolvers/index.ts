import { Resolvers } from '@efrei/graphql'
import { hello } from './query'
import { createAccount } from './mutation/createAccount'
import { createSession } from './mutation/createSession'
import { createPost } from './mutation/createPost'
import { deletePost } from './mutation/deletePost'
import { getPost } from './query/getPost'
import { getAllPosts } from './query/getAllPosts'
import { getMe } from './query/getMe'
import { updatePost } from './mutation/updatePost'

export const resolvers: Resolvers = {
  Query: {
    hello,
    getPost,
    getAllPosts,
    getMe,
  },
  Mutation: {
    createAccount,
    createSession,
    createPost,
    deletePost,
    updatePost,
  },
}
