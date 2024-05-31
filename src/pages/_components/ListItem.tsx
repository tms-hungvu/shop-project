
import { ICart } from "@/interface/cart.interface";
import { IProduct } from "@/interface/product.interface";
import { AppContext } from "@/reducer/app.reducer";
import { cartAdd } from "@/action/cart.action";
import {   useContext, useState } from "react";
import { toast } from "react-toastify";
import DetailItem from "./DetailItem";
import axios from "axios";
import useSWR, { SWRConfiguration } from "swr";
import { Skeleton } from 'antd';
import { webSet } from "@/action/web.action";

const url = `${process.env.NEXT_PUBLIC_URL_API}/products`;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export default function ListItem({data} : {data : IProduct[]}) {
  
 


  const {  isLoading, error } = useSWR(
    url,
    fetcher as SWRConfiguration<any> 
  );

  const [detail, setDetail] = useState<IProduct>();
  const [showDetail, setShow] = useState<boolean>(false);
  const {dispatch} = useContext<any>(AppContext);
  const {state} = useContext<any>(AppContext);


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
  
  if(error) {
    return <h1> Something went error</h1>
  }

  if(isLoading) {
    return (<>
     <div>
     <Skeleton active={true} />
     </div>
     <div>
     <Skeleton active={true} />
     </div>
     <div>
     <Skeleton active={true} />
     </div>
    </>)
  }


  return (
    <>
    
  {showDetail &&  <DetailItem detail={state.web.show} setShow={setShow} />}

       {data?.map((item : IProduct, key : number) => (
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
               <span className="btn addToCart" onClick={(e :  React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                 e.currentTarget.innerText = "Added to cart"
                handleAddToCart(item)
               }}>
                    Add to Cart
               </span>
               <span onClick={() => {
                dispatch(webSet({
                   show : true,
                   item : item
                }))
                setShow(true);
                setDetail(item);
               }} className="btn view view-click">
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
