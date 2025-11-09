"use client";

import { CartProvider } from "@/app/context/CardContext";
import { WishlistProvider } from "./context/WishlistContext";
import { Toaster } from 'sonner';

export default function Providers({ children }) {
  return (
    <WishlistProvider>
      <CartProvider>
        {children}
        <Toaster position="top-center" expand={true} richColors />
      </CartProvider>
    </WishlistProvider>
  );
}
