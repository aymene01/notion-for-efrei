import { useMutation } from '@tanstack/react-query'
import request from '../http/request'
import { UseMutationOptions } from '@tanstack/react-query'

export default function useSwrMutation<T, K extends string | number | symbol>(
  query: string,
  args?: UseMutationOptions,
) {
  return useMutation<{ [key in K]: T }, Error, any>(
    variables => {
      return request({ query, variables }) as any
    },
    {
      ...args,
    },
  )
}
