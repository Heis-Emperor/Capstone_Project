import Image from "next/image";

import Link from "next/link";
import { getProductById } from "@/lib/product";
import { Badge } from "@/components/ui/badge";
import AddToWishlist from "@/components/AddToWishlist";
import RemoveFromCartButton from "@/components/RemoveFromCartButton";
import AddToCartButton from "@/components/AddToCartButton";


export function generateStaticParams() {
    return [];
}

export default async function ProductPage({ params }) {
    const { id } = await params;
    const product = await getProductById(id);
    if (!product) {
        return (
            <div className="space-y-4">
                <p>Product not found.</p>
                <Link href="/" className="underline">Go back</Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-square w-full bg-muted/40 rounded-xl overflow-hidden">
                {product.image ? (
                    <Image src={product.image} alt={product.title} fill className="object-cover" />
                ) : null}
            </div>
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <p className="text-muted-foreground">Category: {product.category}</p>
                <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
                <p className="leading-relaxed">{product.description}</p>
                <div className="text-sm text-muted-foreground">Rating: ⭐ {product.rating.toFixed(1)}</div>
                <div>
                    {product.inStock > 0 ? (
                        <Badge variant="success">In Stock</Badge>
                    ) : (
                        <Badge variant="destructive">Out of Stock</Badge>
                    )}
                </div>
                <div className="flex flex-wrap gap-3">
                    {product.inStock ? (
                        <AddToCartButton product={product} className="w-full md:w-auto" />
                    ) : (
                        <RemoveFromCartButton productId={product.id} className="w-full md:w-auto" />
                    )}
                    {/* <AddToWishlist productId={product.id} /> */}
                </div>
            </div>
        </div>
    );
}