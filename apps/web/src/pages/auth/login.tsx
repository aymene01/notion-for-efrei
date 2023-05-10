import { Input, Button, Heading, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import createSession from '@/lib/queries/createSession'
import useSwrMutation from '@/lib/hooks/useSwrMutation'
import { UserAuthenticated } from '@efrei/graphql'
import { toast } from 'react-hot-toast'
import { useUser } from '@/lib/context/user'
import Link from 'next/link'

type LoginRequest = {
  email: string
  password: string
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginRequest>()
  const { mutate, isSuccess, data } = useSwrMutation<UserAuthenticated, 'createSession'>(createSession, {
    onError: (error: Record<string, string>) => {
      toast.error(error.message)
    },
  })

  const { login } = useUser()
  const [show, setShow] = React.useState<boolean>(false)

  const handleCreateAccount = (data: LoginRequest) => {
    mutate(data)
  }

  const handleToggle = () => setShow(!show)

  React.useEffect(() => {
    if (isSuccess) {
      const {
        meta: { token },
        user,
      } = data.createSession

      login({ user }, token)
    }
  }, [isSuccess])

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col space-y-4">
      <Heading>Sign In</Heading>
      <div className="flex items-center justify-center flex-col w-2/4 space-y-4">
        <div className="space-y-2">
          <Input width="96" placeholder="Email" {...register('email')} />
          <InputGroup>
            <Input width="96" placeholder="Password" {...register('password')} type={show ? 'text' : 'password'} />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleToggle}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>
        <Button onClick={handleSubmit(handleCreateAccount)}>Sign In</Button>
      </div>
      <Link href="/auth/register">
        <p className="text-blue-500">Do not have an account yet ?</p>
      </Link>
    </div>
  )
}

export default Login
