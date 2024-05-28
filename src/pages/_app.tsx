import "@/styles/app.scss";
import type { AppProps } from "next/app";
import Index from "@/components";
import Head from "next/head";
import { SWRConfig } from 'swr';
import { AppContextReducer } from "@/reducer/app.reducer";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const fetcher = (...args : [input: RequestInfo, init?: RequestInit]) => fetch(...args).then((res) => res.json())
export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Head>
    <meta  />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  
    <title>Shopping Cart </title>
  </Head>
 <AppContextReducer>
    <SWRConfig value={{ fetcher }}>
          <Index>
            <ToastContainer />
            <Component {...pageProps} />
          </Index>
    </SWRConfig>
 </AppContextReducer>
 


  
  </>;
}
