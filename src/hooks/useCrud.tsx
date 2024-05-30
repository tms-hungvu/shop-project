import useSWR from "swr";

import { useCallback, useEffect, useMemo, useState } from "react";

import { isArray, isEmpty } from "lodash";

import productService from "@/services/product.service";
import { IProduct } from "@/interface/product.interface";
export function useCrud<T, K = T>(
  url: string,
  key: keyof T,
  fetchOptions?: any
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const fetcher = useCallback(async () => {
    setIsLoading(true);
    const response = await productService.getAll();
    setIsLoading(false);
    return  response;
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
        const response = await productService.create(newItem as IProduct);
        const result =  response ;
        if (data && mutate) {
            let newData : any= data
            if (isArray(data)) {
                newData = [...data, result]
            }
            await mutate(newData, shouldRevalidate)
        }
        setIsLoading(false);
        return result;
    }, [url, data, mutate]);


    const update = useCallback(async (updatedItem: IProduct, shouldRevalidate = false): Promise<T> => {


        setIsLoading(true);

        const response = await productService.update(updatedItem as IProduct, Number(updatedItem.id) );
        const result : any =  response ;
       
        if (data && mutate) {
            let newData : any = data
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
  


    const remove = useCallback(async (shouldRevalidate = false,  id : string | number): Promise<T> => {


        setIsLoading(true);
        const response = await productService.delete(id);
       
        const result =  response.data ;
       
        if (data && mutate) {
            let newData : any = data
            if (isArray(data)) {
                newData = data.filter(item => item.id != id)
            }
            await mutate(newData, shouldRevalidate);
        }
        setIsLoading(false);
        return result;
    }, [url, data, mutate, key])
    
    const memoizedData = useMemo(() => (!isEmpty(data) ? data : []), [data])

    return {
        remove,
        update,
        create,
        fetcher : { data: memoizedData, error, loading : isLoading, mutate },

    }
}
