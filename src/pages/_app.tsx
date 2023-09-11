import '@/styles/globals.css'
import '../../public/bootstrap-5.2.3-dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
