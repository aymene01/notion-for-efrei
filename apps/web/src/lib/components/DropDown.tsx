import { useUser } from '@/lib/context/user'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { Menu } from '@headlessui/react'

export const DropDown = () => {
  const { logout, state } = useUser()

  const menuItems = [
    { label: state.email },
    { label: 'Settings', href: '#' },
    { label: 'Billing', href: '#' },
    { label: 'Dashboard', href: '#' },
    { label: 'Settings', href: '#' },
    { label: 'Sign out', onClick: logout },
  ]

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
          {menuItems.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => {
                const commonClasses = `${
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } block px-4 py-2 text-sm`

                if (item.onClick) {
                  return (
                    <button onClick={item.onClick} className={`${commonClasses} w-full`}>
                      {item.label}
                    </button>
                  )
                }

                return (
                  <a href={item.href} className={commonClasses}>
                    {item.label}
                  </a>
                )
              }}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  )
}
