import { Options } from './types'
import { partial } from 'lodash'
import { createAccount } from './domains/auth/createAccount'
import { createSession } from './domains/auth/createSession'
import { createPost } from './domains/post/createPost'
import { deletePost } from './domains/post/deletePost'
import { getPost } from './domains/post/getPost'
import { getAllPosts } from './domains/post/getAllPosts'

export const createBusiness = (opts: Options) => {
  return {
    createAccount: partial(createAccount, opts),
    createSession: partial(createSession, opts),
    createPost: partial(createPost, opts),
    deletePost: partial(deletePost, opts),
    getPost: partial(getPost, opts),
    getAllPosts: partial(getAllPosts, opts),
  }
}

export type Business = ReturnType<typeof createBusiness>
