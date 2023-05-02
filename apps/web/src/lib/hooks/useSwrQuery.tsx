import { useQuery } from '@tanstack/react-query'
import request from '../http/request'

export default function useSwrQuery<T, K extends string | number | symbol>(
  key: K,
  query: string,
  variables: Record<string, unknown> = {},
) {
  return useQuery<{ [key in K]: T }>({
    queryKey: [key],
    queryFn: async () => request({ query, variables }) as any,
  })
}
