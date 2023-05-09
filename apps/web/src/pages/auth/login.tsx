import { Input, Button, Heading, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import createSession from '@/lib/queries/createSession'
import useSwrMutation from '@/lib/hooks/useSwrMutation'
import { UserAuthenticated } from '@efrei/graphql'
import { toast } from 'react-hot-toast'
import { useUser } from '@/lib/context/user'

type LoginRequest = {
  email: string
  password: string
}

const Login = () => {
  const [show, setShow] = React.useState<boolean>(false)
  const { register, handleSubmit } = useForm<LoginRequest>()
  const { mutate, isSuccess, error, data } = useSwrMutation<UserAuthenticated, 'createSession'>(createSession)

  const { login } = useUser()

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

  React.useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col space-y-4">
      <Heading>Sign In</Heading>
      <div className="flex items-center justify-center flex-col w-1/4 space-y-4">
        <div className="space-y-2">
          <Input placeholder="Email" {...register('email')} />
          <InputGroup>
            <Input placeholder="Password" {...register('password')} type={show ? 'text' : 'password'} />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleToggle}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>
        <Button onClick={handleSubmit(handleCreateAccount)}>Sign In</Button>
      </div>
    </div>
  )
}

export default Login
