import { useUser } from '@/lib/context/user'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { Menu } from '@headlessui/react'

export const DropDown = () => {
  const { logout, state } = useUser()
  return (
    //@ts-ignore
    <Menu as="div" className="relative">
      <div>
        <Menu.Button>
          <Bars3Icon className="h-6 w-6 text-white" />
        </Menu.Button>
      </div>
      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="">
          <Menu.Item>
            {({ active }) => (
              <h1 className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                {state.email}
              </h1>
            )}
          </Menu.Item>
          <div className="w-full h-[1px] bg-gray-200" />
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}
              >
                Settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}
              >
                Billing
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}
              >
                Dashboard
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}
              >
                Settings
              </a>
            )}
          </Menu.Item>
          <div className="w-full h-[1px] bg-gray-200" />
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => logout()}
                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full`}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  )
}
