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
import { updatePost } from './domains/post/updatePost'
// import { apply } from './helpers/protect'

export const createBusiness = (opts: Options) => {
  const { protect } = opts.iamService

  const partialise = <T, U>(fn: (opts: Options, args: U) => T) => partial(fn, opts)
  const protectResolver = <T, U>(fn: (opts: Options, args: U, ctx: Context) => T) => partial(protect(fn), opts)

  return {
    createAccount: partialise(createAccount),
    createSession: partialise(createSession),
    createPost: protectResolver(createPost),
    deletePost: protectResolver(deletePost),
    getPost: protectResolver(getPost),
    getAllPosts: protectResolver(getAllPosts),
    getAuthContext: partialise(getAuthContext),
    getMe: protectResolver(getMe),
    updatePost: protectResolver(updatePost),
  }
}

export type Business = ReturnType<typeof createBusiness>
