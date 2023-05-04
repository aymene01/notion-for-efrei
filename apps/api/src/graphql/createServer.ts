import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { json } from 'body-parser'
import { promisify } from 'util'
import { Options } from './types'
import { resolvers } from './resolvers'
import { createContext, Context } from './context'
import { partial } from 'lodash'

export const createServer = async (opts: Options) => {
  const context = partial(createContext, opts)

  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer<Context>({
    typeDefs: opts.typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  app.use(
    opts.mountPath,
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async req => context(req),
    }),
  )

  httpServer.keepAliveTimeout = opts.keepAliveTimeout

  return {
    start: async () => {
      const { host, port } = opts.listenAddr
      await new Promise<void>(resolve => httpServer.listen({ port, host }, resolve))
      opts.logger.info(`🚀 Server ready at http://${host}:${port}${opts.mountPath}`)
    },
    stop: async () => {
      await server.stop()
      await promisify(httpServer.close).bind(httpServer)()
    },
  }
}
