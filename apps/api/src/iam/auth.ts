import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Options } from './types'

export const hashPassword = async (password: string): Promise<string> => {
  const SALT_ROUNDS = 10
  return bcrypt.hash(password, SALT_ROUNDS)
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}

export const generateToken = (opts: Options, payload: Record<string, unknown>) => {
  return jwt.sign(payload, opts.jwtSecretKey)
}
