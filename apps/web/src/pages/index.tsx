import * as React from 'react'
import { Button } from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import hello from '@/lib/queries/hello'
import useSwrQuery from '@/lib/hooks/useSwrQuery'
import useSwrMutation from '@/lib/hooks/useSwrMutation'
import { Hello, UserAuthenticated } from '@efrei/graphql'
import createSession from '@/lib/queries/createSession'

export default function Home() {
  const { data } = useSwrQuery<Hello, 'hello'>('hello', hello)
  const { mutate, data: loginData, isError } = useSwrMutation<UserAuthenticated, 'createSession'>(createSession)

  const notify = () => toast.success('We are live! 🚀')

  React.useEffect(() => {
    if (loginData) {
      toast.success(`Welcome ${loginData.createSession.user.email}!`)
    }
  }, [loginData])

  React.useEffect(() => {
    if (isError) {
      toast.error('Invalid credentials')
    }
  }, [isError])

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col space-y-5">
      <h1 className="text text-6xl font-light">
        Hey from <span className="font-extrabold italic">EFREI</span> fullstack app
      </h1>
      {data && <p className="text text-2xl font-light">{data.hello.message}</p>}
      <Button onClick={notify}>Get Started</Button>
      <Button
        onClick={() =>
          mutate({
            email: 'hello',
            password: '',
          })
        }
      >
        Test login
      </Button>
    </div>
  )
}
