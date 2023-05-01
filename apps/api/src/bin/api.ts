import { createServer } from '@/graphql/createServer'
import { createIamService } from '@/iam/createIamService'
import { connectDatabase } from '@/database'
import { createBusiness } from '@/business/createBusiness'
import { Logger, logger, waitForSignal } from '@efrei/toolbox'
import fs from 'fs'
import * as Env from './env'
import path from 'path'

const api = async (logger: Logger) => {
	const database = connectDatabase({
		logger,
		connectionPoolSize: Env.DATABASE_CONNECTION_POOL_SIZE,
		databaseUrl: Env.DATABASE_URL,
		queryTimeout: Env.DATABASE_QUERY_TIMEOUT,
	})

	const iamService = createIamService({
		database,
		jwtDuration: Env.JWT_DURATION,
		jwtSecretKey: Env.JWT_SECRET,
	})

	const business = createBusiness({
		database,
		iamService,
	})

	const graphqlServer = await createServer({
		logger,
		business,
		enableDebug: Env.GRAPHQL_DEBUG,
		enableIntrospection: Env.GRAPHQL_ENABLE_INTROSPECTION,
		keepAliveTimeout: Env.GRAPHQL_KEEP_ALIVE_TIMEOUT,
		listenAddr: Env.LISTEN_ADDR,
		mountPath: Env.GRAPHQL_MOUNT_PATH,
		typeDefs: fs.readFileSync(Env.GRAPHQL_SCHEMA_PATH, 'utf-8'),
	})

	await graphqlServer.start()
	await database.start()
	await waitForSignal(['SIGINT', 'SIGTERM'])
	await graphqlServer.stop()
	await database.stop()
}

api(logger).catch(err => {
	console.error(err)
	process.exit(1)
})
