import Image from "next/image";
import Link from "next/link";
import ProductList from "@/components/ProductList";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { allProducts } from "@/lib/product";
export default function Home() {
  const products = allProducts();
  const featured = products.slice(0, 4);
  return (
    <>
      <div className="space-y-10">
        {/* hero section */}
        <section>
          <Card className="text-left p-10 space-y-4 bg-secondary text-secondary-foreground ">
            <h1 className="text-5xl text-center">Welcome to <span className="font-bold text-blue-950">DeEmpire</span></h1>
            <p className="text-center">Discover beauty, fragrances, furniture, and groceries-all in one place. Add to cart and enjoy seamless shopping.</p>
            <div className="space-x-3 items-center flex justify-center">
              <Link href="/products">
                <Button>Shop Now</Button>
              </Link>
            </div>
          
          </Card>
        </section>
        <section>
          <div className="flex text-left">
          <h2 className="text-3xl font-semibold">Featured Products</h2>
         
          </div>

        <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((product) => (
            <div key={product.id}>
              <Link href={`/products/${product.id}`}>
                <ProductList product={product} />
              </Link>
            </div>
          ))}
        </div>
          </section>

        
      </div>
       <div className="flex items-center justify-end my-10">
        {/* <Link href="/products">
          <Button >View More</Button>
        </Link> */}
         <Link href="/products" className="text-sm underline ">View All</Link>
      </div> 
    </>
  );
}
