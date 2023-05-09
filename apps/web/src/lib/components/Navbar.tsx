import Link from 'next/link'
import { useUser } from '@/lib/context/user'

const Navbar = () => {
  const { logout } = useUser()
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link className="text-white" href="/">
                Logo
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
