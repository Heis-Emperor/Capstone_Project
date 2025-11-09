'use client';

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Heart } from "lucide-react";
import { useCart } from "../app/context/CardContext";
import { useWishlist } from "@/app/context/WishlistContext";
// import { MdMenu } from "react-icons/md";
import HamburgerMenu from "@/app/menu/menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { count } = useCart();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-primary/80 backdrop-blur-md border-b">
      <div className="flex gap-2 mx-auto max-w-[1200px] px-6 py-4 justify-between">
          <Link href={"/"} className="flex gap-2 items-center font-semibold text-primary-foreground">
            <ShoppingBag className="w-5 h-5" />
            DeEmpire
          </Link>

          <nav className="text-center items-center hidden md:block">
            <Link href={"/"} className="mx-4 hover:underline text-primary-foreground">
              Home
            </Link>
            <Link href={"/products"} className="mx-4 hover:underline text-primary-foreground">
              Products
            </Link>
            <Link href={"/about"} className="mx-4 hover:underline text-primary-foreground">
              About
            </Link>
            <Link href={"/contact"} className="mx-4 hover:underline text-primary-foreground">
              Contact
            </Link>
          </nav>
            
          <div className="flex gap-3">
            <Link
              href={"/cart"}
              className="flex gap-2 hover:underline text-[14px] font-normal items-center text-primary-foreground"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              <span> Cart</span>
              {count > 0 && (
                <span className="bg-secondary text-secondary-foreground rounded-full px-2 text-[12px] font-semibold">
                  {count}
                </span>
              )}
            </Link>
            <div className="md:hidden" >
              <HamburgerMenu />
            </div>
          </div>
        </div>
    </header>
  );
};

export default Navbar;
