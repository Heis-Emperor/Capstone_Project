"use client";

import { useCart } from "../app/context/CardContext";
import { Button } from "./ui/button";


export default function RemoveFromCartButton({ productId, className }) {
    const cart = useCart();
    const inCart = Boolean(cart.state.items[productId]);
    if (!inCart) return null;
    return (
        <Button variant="outline" className={className} onClick={() => cart.remove(productId)}>
            Remove from Cart
        </Button>
    );
}