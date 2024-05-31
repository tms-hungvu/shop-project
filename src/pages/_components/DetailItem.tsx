import { ICart } from "@/interface/cart.interface";
import { IProduct } from "@/interface/product.interface"
import { Dispatch, SetStateAction, useContext } from "react";
import { useRouter } from 'next/router'
import { AppContext } from "@/reducer/app.reducer";
import { cartAdd } from "@/action/cart.action";
import { toast } from "react-toastify";
interface IDetailItemProp {
    detail : IProduct | undefined;
    setShow : Dispatch<SetStateAction<boolean>>;
}

export default function DetailItem ({detail, setShow} : IDetailItemProp) {
    const {state} = useContext<any>(AppContext);
    const router = useRouter();
    const {dispatch} = useContext<any>(AppContext);
    const handleAddToCart = (item : IProduct | undefined) => {
      if(item){
        const payload : ICart = {
            name : item.title,
            price : item.price,
            quantity : 1,
            image : item.image,
            id : String(item.id)
        }
        dispatch(cartAdd(payload));
        toast.success(`Added "${payload.name}" to cart`)
        router.push('/cart', undefined, { shallow: true })
      }
    }
    return (<section className="app__view--product">
    
    <div className="app__view--product-container">
    <div className="app__popup--cart-close">
        <div onClick={() => setShow(false)} className="app__popup--cart-close-icon">&times;</div>
    </div>
  
    <div className="app__view--product-container-left">
         <img src={state.web.item.image} alt=""/>
    </div>
    <div className="app__view--product-container-right">
        <span>
        {state.web.item.title}
        </span>
  
        <span className="app__view--product-container-right-price">${state.web.item.price}</span>
  
        <p>{state.web.item.content}</p>
  
        <button onClick={() => handleAddToCart(state.web.item)} className="add-to-cart-detail" > Add to cart</button>
  
        <button onClick={() => setShow(false)} className="add-to-cart-detail-close"> Close</button>
    </div>
  </div>
   </section>)
}