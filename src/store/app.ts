import { cartsReducer } from "@/reducer/cart.reducer";
import { webReducer } from "@/reducer/web.reducer";


import { initializerCarts } from "@/reducer/cart.reducer";
import { initializerWeb } from "@/reducer/web.reducer";


import { combineReducers } from "@/util/core";



export const initialState = { carts: initializerCarts, web : initializerWeb };
export const rootReducer = combineReducers({ carts : cartsReducer, web : webReducer}); 
