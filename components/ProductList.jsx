
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ShoppingBag } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import { ShoppingCartIcon } from "lucide-react";

const ProductList = ({ product }) => {

  return (
    <Card>
      <CardHeader className="relative p-0">
        <div className="relative">
          <img src={product.image} alt={product.title} className="object-cover w-full" />
          <div className="absolute top-2 right-3 z-10">
            <AddToCartButton product={product} variant="ghost" size="icon" className="rounded-full bg-white/90 hover:bg-white shadow-sm" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <Link href={`/products/${product.id}`} className="text-[16px] font-semibold hover:underline">
          {product.title}
        </Link>
        <div className="flex justify-between">
          <p className="flex gap-1 font-light">⭐  {product.rating}</p>
          <p className="flex text-[16px] font-bold">
            $
            {product.price}{" "}
          </p>
        </div>
        <div className="flex justify-between items-center">
           <div>
                    {product.inStock > 0 ? (
                        <Badge variant="success">In Stock</Badge>
                    ) : (
                        <Badge variant="destructive">Out of Stock</Badge>
                    )}
                </div>
                <Link href={`/products/${product.id}`} className="text-sm  hover:underline">
          <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground" href={`/products/${product.id}`}>View Details</Button>
        </Link>
        </div>
      </CardContent>

    </Card>

  );
};

export default ProductList;
