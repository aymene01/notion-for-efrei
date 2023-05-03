import { Options } from './types'
import { partial } from 'lodash'
import { createAccount } from './domains/auth/createAccount'
import { createSession } from './domains/auth/createSession'
import { createPost } from './domains/post/createPost'
import { deletePost } from './domains/post/deletePost'
import { getPost } from './domains/post/getPost'
import { getAllPosts } from './domains/post/getAllPosts'
import { getAuthContext } from './domains/auth/getAuthContext'
import { getMe } from './domains/user/getMe'
import { Context } from '@/graphql/context'

export const createBusiness = (opts: Options) => {
  const { protect } = opts.iamService

  const partialise = <T, U>(fn: (opts: Options, args: U) => T) => partial(fn, opts)
  const partialiseProtect = <T, U>(fn: (opts: Options, args: U, ctx: Context) => T) => partial(protect(fn), opts)

  return {
    createAccount: partialise(createAccount),
    createSession: partialise(createSession),
    createPost: partialiseProtect(createPost),
    deletePost: partialiseProtect(deletePost),
    getPost: partialiseProtect(getPost),
    getAllPosts: partialiseProtect(getAllPosts),
    getAuthContext: partialise(getAuthContext),
    getMe: partialiseProtect(getMe),
  }
}

export type Business = ReturnType<typeof createBusiness>
