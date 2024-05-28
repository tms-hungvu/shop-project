'use client'

import { ICart } from "@/interface/cart.interface";


export const initialCarts : ICart[] = [
]; 



let storedData : any | ICart[] = initialCarts;

if(typeof window !== 'undefined'){
    storedData =  JSON.parse(localStorage.getItem("state") as any);
}


export const initializerCarts = typeof window !== 'undefined' && localStorage.getItem('state') ? storedData.carts : initialCarts;



export const cartsReducer = (state : ICart[], action : any) => {
    switch (action.type) {
 
     case "CART_ADD" : { 
        const check = state.some(item => item.id == action.payload.id);
        if(check){
            return state.map((item) => {
                if(item.id == action.payload.id){
                   return {
                      ...item,
                      quantity : item.quantity + action.payload.quantity
                   }
                }
                return item;
            })

        }else {
            return [...state, action.payload];
        }

     }
     case "CART_UPDATE" : {
      
        return state.map((item) => {
            if(item.id === action.payload.id){
                return action.payload;
            }else {
                return item;
            }
        })
       
     }
     case "CART_DELETE" : { 
        return state.filter((item) => item.id != action.payload.id);
     }
 
     case "CART_SET" : { 
        return(action.payload);
     }
      default:
        return state;
    }
};