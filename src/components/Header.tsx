import { ICart } from "@/interface/cart.interface";
import { AppContext } from "@/reducer/app.reducer";
import Link from "next/link";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import Joi from "joi";
import {  useForm } from 'react-hook-form';
import { ISearch } from "@/interface/search.interface";
import { joiResolver } from "@hookform/resolvers/joi";
import { axiosClient } from "@/api/axios";
import { IProduct } from "@/interface/product.interface";
import { useRouter } from 'next/navigation';
const schemaSearch = Joi.object({
  key : Joi.string().required()
})

export default function Header(){
  const { push } = useRouter();
  const [listAutoComplete, setAutoComplete] = useState<IProduct[]>([]);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);
  const { register, handleSubmit } = useForm<ISearch>({
    resolver : joiResolver(schemaSearch)
  });

  const search = useCallback(async () => {
      if(value){
        const dataItem : IProduct[]= await axiosClient.get('products');
        let results = dataItem.filter((item, key) => {
           
           return item.title.toLowerCase().includes(value.toLowerCase())
        });
        setAutoComplete(results.slice(0, 5));
      }else {
        setAutoComplete([]);
      }
      
  }, [debouncedValue]);


  useEffect(() => {
    search();
  }, [debouncedValue, search]);


    const {state} = useContext<any>(AppContext);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        let sum = 0;
        if(state.carts){
            sum = state.carts.reduce((accumulator : number, item : ICart) => accumulator + item.quantity, 0);
        }
        setTotal(sum)
    }, [state])

    const onSubmit = (data : ISearch) => {
      
      push('/search/' + data.key);
    }

    const onTyping = (e :  React.MouseEvent<HTMLButtonElement>) => {
      setValue(e.currentTarget.value);
      
    }
    return (<>
      <nav className="nav">
    <div className="nav__center container">
     
      <Link href="/">
      <div className="nav__logo">
        <h1>Manchester<span>City</span></h1>
      </div>
      </Link>

      <ul className="nav__list">
        <li>
          <form onSubmit={handleSubmit(onSubmit)} className="app__search">
              <input {...register('key', {
                onChange : (e) => onTyping(e)
              })} type="text" placeholder="Enter key ..."/>
              <button type="submit"> Search</button>
              {listAutoComplete.length != 0  && <div className="app__search--list-autocomplete">
                   <ul className="">

                     {listAutoComplete.length != 0 && listAutoComplete.map((item, key) => (
                        <li className="" key={key}>
                        <div className="">
                            <img src={item.image} alt="" className=""  />
                            <span className="">{item.title}</span>
                        </div>
                    </li>
                     ))}
                     
                    
                    
                   </ul>
              </div>} 
          </form>
        </li>
        <Link href="/product" className="nav__list--item" >Manage Product</Link>
        <Link href="/login" className="login">Login</Link>

        <Link href="/cart">
        <div className="app__cart--icon">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          <span className="app__cart--icon-quantity"> {total}</span>
        </div>
        </Link>

      </ul>

      
    </div>
  </nav>
    
    </>)
}