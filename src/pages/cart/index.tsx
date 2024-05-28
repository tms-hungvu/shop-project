import { ICart } from "@/interface/cart.interface";
import { AppContext } from "@/reducer/app.reducer";
import { useContext, useEffect, useMemo, useState } from "react";
import { cartUpdate, cartDelete, cartSet} from "@/action/cart.action";
import Link from "next/link";
export default function Cart(){
  const [listCarts, setListCarts] = useState<ICart[]>([]);
  const {dispatch} = useContext<any>(AppContext);
  const {state} = useContext<any>(AppContext);

  useEffect(() => {
    setListCarts(state.carts);
  }, [state])

  const getTotalCart = useMemo(() => {
    let sum = 0;
    if(listCarts){
        sum = listCarts.reduce((accumulator, item) => accumulator + (item.quantity * item.price), 0);
    }
   return sum;
  }, [listCarts, state])

  const increase = (item : ICart) => {
    if(item.quantity + 1 > 5) return true; 
     const payload = {
      ...item,
      quantity : item.quantity + 1
     }
     dispatch(cartUpdate(payload));
  }
  const decrease = (item : ICart) => {
    if(item.quantity - 1 == 0) return true; 
    const payload = {
      ...item,
      quantity : item.quantity - 1
     }
     dispatch(cartUpdate(payload));
  }

  const deleteCart = (id : number | string) => {
    dispatch(cartDelete(id));
  }
  const clearCarts = () => {
     dispatch(cartSet([]));
  }

    return <>
     <section className="cart__overlay">


    <div className="cart ">
      
      <h1>Your Cart</h1>
      <div className="cart__centent">

     {listCarts.length == 0 &&  <>
          <img src="https://cdn-icons-png.freepik.com/512/11329/11329060.png" /> 
          <Link href="/"><button id="close-tab">Back to shop </button></Link>
      </>}


      {listCarts.map((item, key) => (
        <div key={key} className="cart__item">
        <img src={item.image} alt="" />
        <div>
          <h3>{item.name}</h3>
          <h3 className="price">${item.price}</h3>
        </div>
        <div>
          <span onClick={() => increase(item)}  className="app__increase">
            <i className="fa fa-chevron-up" aria-hidden="true"></i>
          </span>
          <p>{item.quantity}</p>
          <span onClick={() => decrease(item)} className="app__decrease">
             <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </span>
        </div>

        <div>
          <span onClick={() => deleteCart(item.id)}  className="remove__item">
          <i className="fa fa-trash" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      ))}
        

       

      </div>
      {listCarts.length > 0 &&  <div className="cart__footer">
        <h3>Total: $ <span className="cart__total">{getTotalCart}</span></h3>
        <button onClick={() => clearCarts()} className="clear__cart btn">Clear Cart</button>
      </div>}
     


    </div>



  </section>
    </>
}