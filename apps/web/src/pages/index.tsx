import { Button } from "@chakra-ui/react"
import { toast } from "react-hot-toast"

export default function Home() {

  const notify = () => toast.success('We are live! 🚀')

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col space-y-5">
      <h1 className="text text-6xl font-light">Hey from{' '}
        <span className="font-extrabold italic">EFREI</span>
        {' '}fullstack app
      </h1>
      <Button onClick={notify}>Get Started</Button>
    </div>
  )
}
