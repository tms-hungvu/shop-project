import "@/styles/app.scss";
import type { AppProps } from "next/app";
import Index from "@/components";
import Head from "next/head";
import { AppContextReducer } from "@/reducer/app.reducer";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { SWRConfig } from 'swr'


const swrConfig = {
  revalidateOnFocus: false,
  shouldRetryOnError: false
 }
import useSWRMiddleware from "@/middleware/useMiddleware";
export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Head>
    <meta  />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  
    <title>Shopping Cart </title>
  </Head>
  <SWRConfig value={swrConfig}>
          <AppContextReducer>
          
          <Index>
            <ToastContainer />
            <Component {...pageProps} />
          </Index>

        </AppContextReducer>
  </SWRConfig>



  
  </>;
}
