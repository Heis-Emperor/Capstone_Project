"use client";

import { useCart } from "../app/context/CardContext";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product, className, variant, size }) {
    const cart = useCart();
    
    if (size === 'icon') {
        return (
            <Button 
                variant={variant} 
                size="icon" 
                className={className}
                onClick={() => cart.add(product)}
            >
                <ShoppingCart className="w-4 h-4" />
            </Button>
        );
    }

    return (
        <Button 
            variant={variant || "default"} 
            className={className} 
            onClick={() => cart.add(product)}
        >
            Add to Cart
        </Button>
    );
}