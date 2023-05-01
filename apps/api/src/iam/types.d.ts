import { Database } from '@/database'

export type Options = {
	database: Database
	jwtSecretKey: string

	// In seconds
	jwtDuration: number
}

export type AuthContext = {
	uuid: string
	email: string
}
