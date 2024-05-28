

import { useRequest } from "@/hooks/apiRequest";

import ListItem from "./_components/ListItem";
import Slider from "@/components/Slider";
export default function Home() {
  const { data, isLoading } = useRequest('products');
  
  return (
    <main>
      <Slider />
      <section className="products">
        <div className="product__center">

          <ListItem products={data} isLoading={isLoading}/>
          

        </div>
      </section>
    </main>
  );
}
