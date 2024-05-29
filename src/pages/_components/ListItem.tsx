
import { ICart } from "@/interface/cart.interface";
import { IProduct } from "@/interface/product.interface";
import { AppContext } from "@/reducer/app.reducer";
import { cartAdd } from "@/action/cart.action";
import {  useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import DetailItem from "./DetailItem";
import axios from "axios";
import useSWR, { SWRConfiguration } from "swr";



const url = `${process.env.NEXT_PUBLIC_URL_API}/products`;
//const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function ListItem({data} : {data : IProduct[]}) {

  const fetcher = useCallback(
      async (url: string) => {
        await axios.get(url).then((res) => res.data);
  },[])

  const { data : products,isLoading,  error } = useSWR(
    url,
    fetcher(url) as SWRConfiguration<any>,
  );
  const finalData = products || data
  const [detail, setDetail] = useState<IProduct>();
  const [showDetail, setShow] = useState<boolean>(false);
  const {dispatch} = useContext<any>(AppContext);


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
    return <h1> Loading</h1>
  }


  return (
    <>
    
  {showDetail &&  <DetailItem detail={detail} setShow={setShow} />}

       {finalData?.map((item : IProduct, key : number) => (
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
               <span onClick={() => {
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
