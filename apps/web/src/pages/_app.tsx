import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastProvider } from '@/lib/context/Toaster'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </ChakraProvider>
  )
}
