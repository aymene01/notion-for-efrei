import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastProvider } from '@/lib/context/Toaster'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
