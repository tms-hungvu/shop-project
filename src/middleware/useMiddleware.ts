'use client';
import useCookie from "@/hooks/useCookie";
import { jwtDecode } from "jwt-decode";

import { useRouter } from 'next/navigation';
import { IAuth } from "@/interface/auth.interface";

export default function useSWRMiddleware (useSWRNext : any) {
    const { push } = useRouter();
    const [auth, setAuth] = useCookie('auth', '');
    
    


    return (key : string | null, fetcher : any, config : any) => {
      try {
        const decoded : IAuth  = jwtDecode(auth);
        
        if(decoded.data.role != 1){
            
            if (typeof window !== "undefined") {
                
                push('/login');
                
            }
        }
      } catch (error) {
           
        if (typeof window !== "undefined") {
            
            push('/login');
           
        }
      }
 
     const swr = useSWRNext(key, fetcher, config)
   
    return swr
    }
}