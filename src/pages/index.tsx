



import ListItem from "./_components/ListItem";
import Slider from "@/components/Slider";

import { IProduct } from "@/interface/product.interface";
export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/products`);
  const products = await res.json();
  return {
    props: {
      data : products,
    },
  };
};

export default function Home({ data }: {data : IProduct[]}) {
  
 
  
  return (
    <main>
     
  
      <div className="container">
         <Slider />
      </div>
      <div className="container">
      <section className="products">
        <div className="product__center">
          <ListItem data={data} />
        </div>
      </section>
      </div>
    </main>
  );
}
