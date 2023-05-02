import { useMutation } from '@tanstack/react-query'
import request from '../http/request'

export default function useSwrMutation<T, K extends string | number | symbol>(query: string) {
  return useMutation<{ [key in K]: T }, Error, any>(variables => {
    return request({ query, variables }) as any
  })
}
