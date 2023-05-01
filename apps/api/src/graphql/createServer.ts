// npm install @apollo/server express graphql cors body-parser
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

interface MyContext {
	token?: String
}

export const createServer = async (opts: Options) => {
	const app = express()
	const httpServer = http.createServer(app)

	const server = new ApolloServer<MyContext>({
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
			context: async ({ req }) => ({ token: req.headers.token }),
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
