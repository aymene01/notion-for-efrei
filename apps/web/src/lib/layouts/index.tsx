import { useUser } from '../context/user'

const Layout = ({ children }) => {
  const { isReady } = useUser()

  console.log('isReady', isReady)

  if (!isReady) {
    console.log('isReady if', isReady)
    return <div />
  }

  return children
}

export default Layout
