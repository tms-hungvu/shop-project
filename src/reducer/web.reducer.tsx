'use client'

import { IWeb } from "@/interface/web.interface";
export const initialWeb : IWeb = {
    show : false,
    item : {
        id : '',
        title : '',
        price : 0,
        content : '',
        image : ''
    }
}


export const initializerWeb = initialWeb;


export const webReducer = (state : IWeb, action : any) => {
    switch (action.type) {
 
     case "WEB_SET" : { 
        return(action.payload);
     }
     case "WEB_HIDDEN_POPUP" : {
        return {
            ...state,
            show : action.payload
        };
     }
      default:
        return state;
    }
};