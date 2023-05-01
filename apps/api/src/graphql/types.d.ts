import { Logger } from '@efrei/toolbox'
import { Business } from '@/business/createBusiness'

export type Options = {
	business: Business
	logger: Logger
	mountPath: string
	enableIntrospection: boolean
	enableDebug: boolean
	keepAliveTimeout: number
	listenAddr: { host: string; port: number }
	typeDefs: string
}
