import React from 'react'
import { Heading, Button, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { UserAuthenticated } from '@efrei/graphql'
import createAccount from '@/lib/queries/createAccount'
import useSwrMutation from '@/lib/hooks/useSwrMutation'
import { useRouter } from 'next/router'

type RegisterRequest = {
  name: string
  email: string
  password: string
}

const Register = () => {
  const { register, handleSubmit } = useForm<RegisterRequest>()
  const { mutate, isSuccess, error } = useSwrMutation<UserAuthenticated, 'createAccount'>(createAccount)
  const router = useRouter()

  const handleCreateAccount = (data: RegisterRequest) => {
    mutate(data)
  }

  React.useEffect(() => {
    if (isSuccess) {
      toast.success('Account created')
      router.push('/auth/login')
    }
  }, [isSuccess])

  React.useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

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
      </div>
    </div>
  )
}

export default Register
