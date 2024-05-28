
import { ICart } from "@/interface/cart.interface";
import { IProduct } from "@/interface/product.interface";
import { AppContext } from "@/reducer/app.reducer";
import { cartAdd } from "@/action/cart.action";
import {  useContext } from "react";
import { toast } from "react-toastify";
interface IListItemProp {
  products : IProduct[];
  isLoading : boolean
}
export default function ListItem({ products, isLoading } : IListItemProp) {

  const {dispatch} = useContext<any>(AppContext);
  const {state} = useContext<any>(AppContext);
  console.log(state)
  const handleAddToCart = (item : IProduct) => {
    const payload : ICart = {
        id : String(item.id),
        name : item.title,
        quantity : 1,
        image : item.image,
        price : item.price
    }
     dispatch(cartAdd(payload))
     toast.success(`Added "${item.title}" to cart`);
  }
  if(isLoading) {
    return <h1> Loading</h1>
  }
  return (
    <>
    
       {products?.map((item, key) => (
         <div className="product" key={key}>
         <div className="image__container">
           <img
             src={item.image}
             alt=""
           />
         </div>
         <div className="product__footer">
           <h1>{item.title}</h1>
          
           <div className="bottom">
             <div className="btn__group">
               <span className="btn addToCart" onClick={() => handleAddToCart(item)}>
                    Add to Cart
               </span>
               <span className="btn view view-click">
                 View
               </span>
             </div>
             <div className="price">${item.price}</div>
           </div>
         </div>
       </div>
       ))}
    </>
  );
}
