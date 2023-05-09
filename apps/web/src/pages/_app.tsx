import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastProvider } from '@/lib/context/toaster'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { UserProvider } from '@/lib/context/user'
// import Layout from '@/lib/layouts'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ToastProvider>
          <UserProvider>
            {/* <Layout> */}
            <Component {...pageProps} />
            {/* </Layout> */}
          </UserProvider>
        </ToastProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
