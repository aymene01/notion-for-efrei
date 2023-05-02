import { createServer } from '@/graphql/createServer'
import { createIamService } from '@/iam/createIamService'
import { connectDatabase } from '@/database'
import { createBusiness } from '@/business/createBusiness'
import { Logger, logger, waitForSignal } from '@efrei/toolbox'
import fs from 'fs'
import * as Env from './env'

const api = async (logger: Logger) => {
  //database 🫙
  const database = connectDatabase({
    logger,
    connectionPoolSize: Env.DATABASE_CONNECTION_POOL_SIZE,
    databaseUrl: Env.DATABASE_URL,
    queryTimeout: Env.DATABASE_QUERY_TIMEOUT,
  })

  //services 👨‍🔧
  const iamService = createIamService({
    database,
    jwtDuration: Env.JWT_DURATION,
    jwtSecretKey: Env.JWT_SECRET,
  })

  const business = createBusiness({
    database,
    iamService,
  })

  // Let's rock 🚀
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

  await database.start()
  await graphqlServer.start()
  await waitForSignal(['SIGINT', 'SIGTERM'])
  logger.info('👋 Shut down the server!')
  await graphqlServer.stop()
  await database.stop()
}

api(logger).catch(err => {
  console.error(err)
  process.exit(1)
})
