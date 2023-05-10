import React from 'react'
import { Heading, Button, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { UserAuthenticated } from '@efrei/graphql'
import createAccount from '@/lib/queries/createAccount'
import useSwrMutation from '@/lib/hooks/useSwrMutation'
import { useRouter } from 'next/router'
import Link from 'next/link'

type RegisterRequest = {
  name: string
  email: string
  password: string
}

const Register = () => {
  const { push } = useRouter()
  const { register, handleSubmit } = useForm<RegisterRequest>()
  const { mutate } = useSwrMutation<UserAuthenticated, 'createAccount'>(createAccount, {
    onSuccess: () => {
      toast.success('Account created')
      push('/auth/login')
    },
    onError: (error: Record<string, string>) => {
      toast.error(error.message)
    },
  })

  const handleCreateAccount = (data: RegisterRequest) => {
    mutate(data)
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-screen h-screen flex justify-center items-center flex-col space-y-4">
        <Heading>Create your account</Heading>
        <div className="flex items-center justify-center flex-col w-1/4 space-y-4">
          <div className="space-y-2">
            <Input placeholder="name" {...register('name')} />
            <Input placeholder="email" {...register('email')} />
            <Input placeholder="password" {...register('password')} type={'password'} />
          </div>
          <Button onClick={handleSubmit(handleCreateAccount)}>Create Account</Button>
        </div>
        <Link href="/auth/login">
          <p className="text-blue-500">Already have an account?</p>
        </Link>
      </div>
    </div>
  )
}

export default Register
