import useSWR from "swr";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { isArray, isEmpty } from "lodash";



export function useCrud<T, K = T>(
  url: string,
  key: keyof T,
  fetchOptions?: any
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const fetcher = useCallback(async (url: string) => {
    setIsLoading(true);
    const response = await axios.get(url);
    setIsLoading(false);
    return  response.data;
  }, []);



  const { data, error, isValidating, mutate } = useSWR(url, fetcher, {
    fetchOptions,
  } as any);

   useEffect(() => {
        if (isValidating) {
            setIsLoading(true)
        }  setTimeout(function(){
            setIsLoading(false)
        }, 500)
    },[isValidating])
  


  const create = useCallback(
    async (newItem: K, shouldRevalidate = false) => {
        setIsLoading(true);
        const response = await axios.post(url, newItem);
     
        const result =  response.data as T
        if (data && mutate) {
            let newData = data
            if (isArray(data)) {
                newData = [...data, result]
            }
            await mutate(newData, shouldRevalidate)
        }
        setIsLoading(false);
        return result;
    }, [url, data, mutate]);


    const update = useCallback(async (updatedItem: T, shouldRevalidate = false, urlUpdate : string): Promise<T> => {


        setIsLoading(true);
        const response = await axios.put(urlUpdate, updatedItem);
       
        const result =  response.data ;
       
        if (data && mutate) {
            let newData = data
            if (isArray(data)) {
                newData = data.map((item) => {
                    if(item.id == result.id){
                        return result;
                    }else {
                        return item;
                    }
                })
            }
            await mutate(newData, shouldRevalidate);
        }
        setIsLoading(false);
        return result;
    }, [url, data, mutate, key])
  


    const memoizedData = useMemo(() => (!isEmpty(data) ? data : []), [data])

    return {
        update,
        create,
        fetcher : { data: memoizedData, error, loading : isLoading, mutate },

    }
}
