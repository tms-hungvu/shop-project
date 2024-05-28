import { ICart } from "@/interface/cart.interface";

export const cartAdd = (item : ICart) => ({
    type: "CART_ADD",
    payload : item
});
 
export const cartUpdate = (item : ICart) => ({
    type: "CART_UPDATE",
    payload : item
});
 
export const cartDelete = (id : number | string) => ({
    type: "CART_DELETE",
    payload : { id : id }
});
 
 
export const cartSet = (data : ICart[]) => ({
    type: "CART_SET",
    payload : data
});