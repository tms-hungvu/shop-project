import {  createContext, useEffect, useReducer } from "react";
import { rootReducer, initialState } from "@/store/app";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ICart } from "@/interface/cart.interface";
interface IAppContext {
  carts : ICart[]
}

export const AppContext = createContext({});

export function AppContextReducer({children } : {children : React.ReactNode}){
  const [, setLocalStorage] = useLocalStorage<IAppContext>("state", { carts : []});
    const [state, dispatch] = useReducer(rootReducer, initialState);

    useEffect(() => {
      setLocalStorage(state);
    }, [state]);


    return(
        <>
          <AppContext.Provider value={{state, dispatch}}>
            {children}
          </AppContext.Provider>
        </>
    )
}