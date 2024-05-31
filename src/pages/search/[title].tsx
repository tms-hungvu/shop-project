import { IProduct } from "@/interface/product.interface";
import ListItem from "../_components/ListItem";



export async function getStaticPaths() {
    return {
      paths: [],
      fallback: true,
    }
  }
  
  export async function getStaticProps({ params } : {params : {title : string}}) {
    
    const keySearch : string = params.title
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/products`);
    const products : IProduct[] = await res.json();
    let results = products.filter((item, key) => {
        return item.title.toLowerCase().includes(keySearch.toLowerCase())
     });
    return {
      props: {
        data : results,
      },
    };
  }

  export default function Search({data} : {data : IProduct[]}){
    return (  <div className="container" style={{marginTop : '150px'}}>
    <section className="products">
      <div className="product__center">
        <ListItem data={data} />
      </div>
    </section>
    </div>)
}