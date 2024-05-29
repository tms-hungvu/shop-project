

import { useRequest } from "@/hooks/apiRequest";

import ListItem from "./_components/ListItem";
import Slider from "@/components/Slider";
import { SWRConfig } from "swr";
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
     
      <Slider />
      <section className="products">
        <div className="product__center">
          <ListItem data={data} />
        </div>
      </section>
    </main>
  );
}
