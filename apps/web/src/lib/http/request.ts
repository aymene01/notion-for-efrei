import { GraphQLClient } from 'graphql-request'
import getConfig from 'next/config'

type FetchArgsQl = {
  apiBaseUrl?: string
  query: string
  variables?: Record<string, unknown>
}

const API_URL = 'http://localhost:8080/api/v1'

const safeFetchQL = ({ apiBaseUrl = API_URL, query, variables = {} }: FetchArgsQl): Promise<unknown> => {
  // const { publicRuntimeConfig } = getConfig()
  const jswt = localStorage.getItem('token')

  const options: Record<string, any> = { headers: {} }
  if (jswt) {
    options.headers.authorization = `Bearer ${jswt}`
  }

  const graphQLClient = new GraphQLClient(apiBaseUrl, options)
  return graphQLClient.request(query, variables)
}

const request = async (args: FetchArgsQl): Promise<unknown> => {
  try {
    return await safeFetchQL(args)
  } catch (err: any) {
    throw new Error(err.response.errors[0].message)
  }
}

export default request
