"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CardContext";
import { Button } from "@/components/ui/button";

export default function CartPage() {
    const { items, total, setQty, remove, clear } = useCart();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Your Cart</h1>
            {items.length === 0 ? (
                <div className="text-muted-foreground">
                    Cart is empty. <Link href="/products" className="underline">Continue shopping</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((it) => (
                            <div key={it.id} className="flex items-center gap-4 rounded-xl border p-4">
                                {it.image && (
                                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                                        <Image src={it.image} alt={it.title} fill className="object-cover" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="font-medium line-clamp-1">{it.title}</div>
                                    <div className="text-sm text-muted-foreground">${it.price.toFixed(2)}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" onClick={() => setQty(it.id, it.qty - 1)}>-</Button>
                                    <span className="w-8 text-center">{it.qty}</span>
                                    <Button size="sm" variant="outline" onClick={() => setQty(it.id, it.qty + 1)}>+</Button>
                                </div>
                                <div className="w-20 text-right font-semibold">${(it.qty * it.price).toFixed(2)}</div>
                                <Button size="sm" variant="ghost" onClick={() => remove(it.id)}>Remove</Button>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4 rounded-xl border p-4 h-fit">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-semibold">${total.toFixed(2)}</span>
                        </div>
                        <Link href="/checkout">
                            <Button className="w-full" disabled={items.length === 0}>Checkout</Button>
                        </Link>
                        <Button className="w-full" variant="outline" onClick={clear}>Clear Cart</Button>
                    </div>
                </div>
            )}
        </div>
    );
}