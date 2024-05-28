import { cartsReducer } from "@/reducer/cart.reducer";
import { initializerCarts } from "@/reducer/cart.reducer";

import { combineReducers } from "@/util/core";



export const initialState = { carts: initializerCarts };
export const rootReducer = combineReducers({ carts : cartsReducer }); 
