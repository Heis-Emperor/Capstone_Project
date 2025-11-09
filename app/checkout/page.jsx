"use client";
import { useState } from "react";
import { useCart } from "@/app/context/CardContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function TextInput(props) {
    return <input className="h-10 w-full rounded-lg border border-input bg-background px-3" {...props} />;
}

function Section({ title, children }) {
    return (
        <section className="space-y-3 rounded-xl border p-4">
            <h2 className="font-medium">{title}</h2>
            {children}
        </section>
    );
}

export default function CheckoutPage() {
    const { items, total, clear } = useCart();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        country: "",
        card: "",
        expiry: "",
        cvc: "",
    });

    const disabled = items.length === 0 || loading;

    function onChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (disabled) return;
        setLoading(true);
        // Simulate payment processing delay
        await new Promise((r) => setTimeout(r, 1200));
        const orderId = Math.floor(Math.random() * 1_000_000).toString().padStart(6, "0");
        const lastOrder = {
            id: orderId,
            createdAt: new Date().toISOString(),
            items,
            subtotal: total,
            shipping: total > 0 ? 5 : 0,
            tax: Number((total * 0.075).toFixed(2)),
            total: Number((total * 1.075 + (total > 0 ? 5 : 0)).toFixed(2)),
            customer: form,
        };
        try {
            localStorage.setItem("shopease_last_order", JSON.stringify(lastOrder));
        } catch { }
        clear();
        window.location.href = "/checkout/success";
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Checkout</h1>

            {items.length === 0 ? (
                <div className="text-muted-foreground">
                    Your cart is empty. <Link href="/products" className="underline">Continue shopping</Link>
                </div>
            ) : (
                <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <Section title="Shipping Details">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <TextInput name="name" placeholder="Full name" value={form.name} onChange={onChange} required />
                                <TextInput name="email" placeholder="Email" type="email" value={form.email} onChange={onChange} required />
                                <TextInput name="address" placeholder="Address" value={form.address} onChange={onChange} required />
                                <TextInput name="city" placeholder="City" value={form.city} onChange={onChange} required />
                                <TextInput name="country" placeholder="Country" value={form.country} onChange={onChange} required />
                            </div>
                        </Section>

                        <Section title="Payment">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <TextInput name="card" placeholder="Card number (dummy)" value={form.card} onChange={onChange} required />
                                <TextInput name="expiry" placeholder="MM/YY" value={form.expiry} onChange={onChange} required />
                                <TextInput name="cvc" placeholder="CVC" value={form.cvc} onChange={onChange} required />
                            </div>
                            <p className="text-xs text-muted-foreground">This is a simulation. Do not use real card data.</p>
                        </Section>
                    </div>

                    <div className="space-y-4">
                        <Section title="Order Summary">
                            <div className="space-y-2 text-sm">
                                {items.map((it) => (
                                    <div key={it.id} className="flex items-center justify-between">
                                        <span className="line-clamp-1">{it.title} × {it.qty}</span>
                                        <span>${(it.qty * it.price).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="my-2 h-px bg-border" />
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Subtotal</span><span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Shipping</span><span>${total > 0 ? "5.00" : "0.00"}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Tax (7.5%)</span><span>${(total * 0.075).toFixed(2)}</span>
                            </div>
                            <div className="my-2 h-px bg-border" />
                            <div className="flex items-center justify-between font-semibold">
                                <span>Total</span>
                                <span>${(total * 1.075 + (total > 0 ? 5 : 0)).toFixed(2)}</span>
                            </div>
                            <Button className="mt-4 w-full" type="submit" disabled={disabled}>
                                {loading ? "Processing..." : "Place Order"}
                            </Button>
                            <Link href="/cart" className="mt-2 block text-center text-sm text-muted-foreground underline">Back to cart</Link>
                        </Section>
                    </div>
                </form>
            )}
        </div>
    );
}
