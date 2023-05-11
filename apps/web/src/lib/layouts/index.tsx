import React from 'react'
import { useUser } from '@/lib/context/user'

const Layout = ({ children }: { children: React.ReactElement }) => {
    const { isReady } = useUser()

    if (!isReady) {
        return <div />
    }

    return children
}

export default Layout
