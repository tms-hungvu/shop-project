import { ICart } from "@/interface/cart.interface";
import { AppContext } from "@/reducer/app.reducer";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";


export default function Header(){
    const {state} = useContext<any>(AppContext);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        let sum = 0;
        if(state.carts){
            sum = state.carts.reduce((accumulator : number, item : ICart) => accumulator + item.quantity, 0);
        }
        setTotal(sum)
    }, [state])
    return (<>
      <nav className="nav">
    <div className="nav__center container">
     
      <Link href="/">
      <div className="nav__logo">
        <h1>Manchester<span>City</span></h1>
      </div>
      </Link>

      <ul className="nav__list">
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