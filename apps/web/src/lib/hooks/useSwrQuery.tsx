import { useQuery } from '@tanstack/react-query'
import request from '../http/request'
import { UseQueryOptions } from '@tanstack/react-query'

export default function useSwrQuery<T, K extends string | number | symbol>(
  key: K,
  query: string,
  variables: Record<string, unknown> = {},
  options?: UseQueryOptions<{ [key in K]: T }>
) {
  return useQuery<{ [key in K]: T }>({
    queryKey: [key],
    queryFn: async () => request({ query, variables }) as any,
    ...options,
  })
}
